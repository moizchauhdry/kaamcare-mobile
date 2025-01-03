import { SafeAreaView, TextInput, View } from 'react-native';
import { useState } from 'react';

import { theme } from '../../../config/Theme';
import { Typography } from '../../../components/UI/Typography/Typography';
import { Button } from '../../../components/UI/Button/Button';
import { styles } from './DeleteAccountScreen.styles';
import { useAuth } from '../../../context/AuthContext';
import { useMutationUserAccountDelete } from '../../../hooks/query/user/useMutationUserAccountDelete';

export const DeleteAccountScreen = () => {
  const { handleDeleteAccount } = useAuth();
  const { mutate } = useMutationUserAccountDelete({ onSuccess: handleDeleteAccount });
  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, gap: 8 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Typography size="lg">Confirm Account Deletion</Typography>
          </View>
          <View>
            <Typography style={styles.text}>Are you sure you want to permanently delete your account?</Typography>
          </View>
          <View>
            <Typography>This action cannot be undone.</Typography>
            <Typography weight="bolder">You won’t be able to restore the content once deleted.</Typography>
          </View>
          <View>
            <Typography>
              If you're facing any issues or have questions about our app, we're always here to assist you. Feel free to
              reach out before making your final decision.
            </Typography>
          </View>
          <View style={{ gap: 8 }}>
            <Typography>To confirm deletion, please type: DELETE</Typography>
            <View>
              <TextInput style={styles.input} value={value} onChangeText={(inputValue) => setValue(inputValue)} />
            </View>
          </View>
        </View>
        <View>
          <Button onPress={() => mutate()} disabled={value !== 'DELETE'} variant="danger">
            Delete my account
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
