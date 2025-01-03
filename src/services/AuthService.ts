export class AuthService {
  static isTokenValid(expiry: number) {
    if (!expiry) {
      return false;
    }

    return new Date().getTime() <= expiry * 1000;
  }

  static async getNewToken(
    b2cName: string,
    b2cType: string,
    refreshToken: string,
    clientId: string,
    errorCb?: () => void,
  ) {
    const form = new FormData();
    form.append('clientId', clientId);
    form.append('grant_type', 'refresh_token');
    form.append('refresh_token', refreshToken);

    const response = await fetch(
      `https://${b2cName}.b2clogin.com/${b2cName}.onmicrosoft.com/${b2cType}/oauth2/v2.0/token`,
      {
        method: 'POST',
        body: form,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      errorCb?.();
    }

    return data;
  }
}
