import { StyleSheet } from 'react-native';

import { ScreenModalLayout } from '../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Typography } from '../../../components/UI/Typography/Typography';

export const DisclaimerScreen = () => (
  <ScreenModalLayout title="Disclaimer" isScrollable>
    <Typography style={styles.text}>
      Thank you for using Kaam Care! We encourage you to read our entire Disclaimer Policy below for important
      information.
    </Typography>
    <Typography style={styles.text}>Effective Date: September 18, 2024</Typography>

    <Typography style={styles.text}>
      <Typography weight="semiBold">Definitions and key terms</Typography>
      {`
To help explain things as clearly as possible in this Disclaimer, every time any these terms are referenced, are strictly defined as:
• Company: when this policy mentions "Company," "we," "us," "our," it refers to Kaam Care, Kaam Care LLC that is responsible for your information under this Disclaimer.
• Service: refers to the service provided by Kaam Care as described in the relative terms on this platform.
• You: a person or entity that is registered with Kaam Care to use the services
`}
      <Typography weight="semiBold">Limited Liability</Typography>
      {'\n'}
      Kaam Care endeavors to update and/or supplement the content of the Kaam Care platform on a regular basis. Despite
      our care and attention, content may be incomplete and/or incorrect. The materials offered on the Kaam Care
      platform are offered without any form of guarantee or claim to their correctness. These materials can be changed
      at any time without prior notice from Kaam Care. Particularly, all prices on the Kaam Care platform are stated
      subject to typing and programming errors. No liability is assumed for the implications of such errors. No
      agreement is concluded on the basis of such errors. Kaam Care shall not bear any liability for hyperlinks to
      websites or services of third parties included on the Kaam Care platform. You can visit other websites by
      following hyperlinks to such external sites. While we strive to provide only quality links to useful websites, we
      have no control over the content and nature of these sites. These links to other websites do not imply a
      recommendation for all the content found on these sites. Site owners and content may change without notice and may
      occur before we have the opportunity to remove a link which may have gone ‘bad’. Please be also aware that when
      you leave our Kaam Care platform, other sites may have different privacy policies and terms which are beyond our
      control. Please be sure to check the Privacy Policies of these sites as well as their “Terms of Service” before
      engaging in any business or uploading any information.{'\n'}
      <Typography weight="semiBold">Links to Other Websites Disclaimer</Typography>
      {'\n'}
      This Disclaimer applies only to the Services. The Services may contain links to other websites not operated or
      controlled by Kaam Care. We are not responsible for the content, accuracy or opinions expressed in such websites,
      and such websites are not investigated, monitored or checked for accuracy or completeness by us. Please remember
      that when you use a link to go from the Services to another website, our Privacy Policy is no longer in effect.
      Your browsing and interaction on any other website, including those that have a link on our platform, is subject
      to that website's own rules and policies. Such third parties may use their own cookies or other methods to collect
      information about you. If You click on a third-party link, you will be directed to that third party's site.
    </Typography>

    <Typography style={styles.text}>
      We strongly advise you to review the Privacy Policy and Terms of every site You visit. We have no control over and
      assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
      {'\n'}
      <Typography weight="semiBold">Copyright Disclaimer</Typography>
      {'\n'}
      All intellectual property rights concerning these materials are vested Kaam Care LLC, in copying distribution and
      any other use of these materials is not permitted without the written permission of Kaam Care, except and only to
      the extent otherwise provided in regulations of mandatory law (such as the right to quote), unless otherwise
      stated for certain materials.
      {'\n'}
      <Typography weight="semiBold">General Disclaimer</Typography>
      {'\n'}
      The Kaam Care Service and its contents are provided "as is" and "as available" without any warranty or
      representations of any kind, whether express or implied. Kaam Care is not responsible for content supplied by
      third parties; as such, exercises no editorial control over such content and makes no warranty or representation
      as to the accuracy, reliability or currency of any information, content, service or merchandise provided through
      or accessible via the Kaam Care Service. Without limiting the foregoing, Kaam Care specifically disclaims all
      warranties and representations in any content transmitted on or in connection with the Kaam Care Service or on
      sites that may appear as links on the Kaam Care Service, or in the products provided as a part of, or otherwise in
      connection with the Kaam Care Service, including without limitation any warranties of merchantability, fitness for
      a particular purpose or non-infringement of third party rights. No oral advice or written information given by
      Kaam Care or any of its affiliates, employees, officers, directors, agents, or the like will create a warranty.
      Price and availability information is subject to change without notice. Without limiting the foregoing, Kaam Care
      does not warrant that the Kaam Care Services will be uninterrupted, uncorrupted, timely or error-free.
      {'\n'}
      <Typography weight="semiBold">Errors and Omissions Disclaimer</Typography>
      {'\n'}
      Kaam Care is not responsible for any content, code or any other imprecision. Kaam Care does not provide warranties
      or guarantees In no event shall Kaam Care be liable for any special, direct, indirect, consequential, or
      incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising
      out of or in connection with the use of the Service or the contents of the Service. Kaam Care reserves the right
      to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.
      {'\n'}
      <Typography weight="semiBold">Affiliate Disclosure</Typography>
      {'\n'}
      Kaam Care has affiliate links and in this section of the Disclaimer we will address how we use those affiliate
      links from other websites/ companies and products. These "affiliate links" are specific URLs that contain the
      affiliate's ID or username. In compliance with the Federal Trade Commission (FTC) guidelines, please assume the
      following about links and posts on the Kaam Care Platform:
      {'\n'}• Any/all of the links on Kaam Care are affiliate links of which we may receive a small commission from
      sales of certain items, but the price is the same for you. As Kaam Care has grown, so have costs associated with
      running and maintaining it, and affiliate links are a way we help offset these costs.
    </Typography>

    <Typography style={styles.text}>
      <Typography weight="semiBold">Health Disclosure</Typography>
      {'\n'}
      The information on this Kaam Care Platform such as text, graphics, images, and other materials created third
      parties or obtained from third party licensors, and other materials contained on Kaam Care Platform (collectively,
      "content") is intended solely for informational purposes and may not be used as a substitute for professional
      advice and/or information, as circumstances will vary from person to person. You should not act or rely upon this
      information without seeking professional advice. Do not attempt any of the suggested actions, solutions, remedies,
      or instructions found on Kaam Care Platform without first consulting with a qualified professional. The materials
      are not intended to be nor do they constitute actionable professional advice. Transmissions of this information is
      not intended to create a professional-client relationship between other Enterprises and you. The owners, editors,
      contributors, administrators, and other staff of other Enterprises are not qualified professionals, and are simply
      aggregating information found online for informational purposes only. If you think you may have a medical
      emergency, call your doctor or 911 immediately. Kaam Care does not recommend or endorse any specific tests,
      physicians, products, procedures, opinions, or other information that may be mentioned on the Kaam Care Platform.
      Reliance on any information in the Kaam Care Platform by any type of information, employees, or others visitors is
      solely at your own risk.
      {'\n'}
      <Typography weight="semiBold">Fitness Disclosure</Typography>
      {'\n'}
      Please read this Fitness disclosure before applying any of the information on the Kaam Care Platform We show
      information about Fitness and Nutritional advice. The information on Kaam Care Platform such as text, graphics,
      images, and other materials created by third parties or obtained from third party licensors, and other materials
      contained on Kaam Care Platform (collectively, "content") is intended solely for informational purposes and may
      not be used as a substitute for professional advice and/or information, as circumstances will vary from person to
      person. You should not act or rely upon this information without seeking professional advice. Do not attempt any
      of the suggested actions, solutions, remedies, or instructions found on Kaam Care Platform without first
      consulting with a qualified professional. The materials are not intended to be nor do they constitute actionable
      professional advice. Using any of the information that we provide on Kaam Care Platform is at your own risk.
      Regular exercise is not always without risk, even for healthy individuals. Certain types of exercise are riskier
      than others and all exercise are risky at some degree for some individuals. It's the same with diet. Some dietary
      recommendations are healthy for the majority of people but potentially dangerous to others. You are responsible
      for your own health and safety at all times. As such, by visiting and using Kaam Care Platform you acknowledge and
      agree that you have been assessed by a qualified medical professional (i.e your doctor) who has given you consent
      to take part in physical activity. The exercises provided by Kaam Care are for educational and entertainment
      purposes only, and is not to be interpreted as a recommendation for a specific treatment plan, product, or course
      of action. Exercise is not without risks, and this or any other exercise program may result in injury. They
      include but are not limited to: risk of injury, aggravation of a pre-existing condition, or adverse effect or
      over-exertion such as muscle strain, abnormal blood pressure, fainting, disorders of heartbeat, and very rare
      instances of heart attack. To reduce the risk of injury, before beginning this or any exercise program, please
      consult a healthcare provider for appropriate exercise prescription and safety precautions. The exercise
      instruction and advice presented are in no way intended as a substitute for medical consultation. Kaam Care LLC
      disclaims any liability from and in connection with this program. As with any exercise program, if at any point
      during your workout you begin to feel faint, dizzy, or have physical discomfort, you should stop immediately and
      consult a physician.
      {'\n'}
      <Typography weight="semiBold">Legal Disclosure</Typography>
      {'\n'}
      The materials, any comments or information provided by Kaam Care are for educational purposes only and nothing
      conveyed or provided should be considered legal. You are responsible for whatever you may do with the information
      you obtain from Kaam Care. As such, by visiting and using this Kaam Care Platform you acknowledge and agree that
      you have been assessed by a qualified law expert (i.e. your attorney) who has given you consent to take part in
      any legal activity. Please contact your own attorney with any specific questions you have related to the
      information provided that are of legal nature.
      {'\n'}
      <Typography weight="semiBold">Educational Disclosure</Typography>
      {'\n'}
      Any information provided by Kaam Care is for educational purposes only, and is not to be interpreted as a
      recommendation for a specific treatment plan, product, or course of action, Kaam Care is a distributor and not a
      publisher of the content supplied by third parties; as such, Kaam Care exercises no editorial control over such
      content and makes no warranty or representation as to the accuracy reliability or currency of any information or
      educational content provided through or accessible via Kaam Care Platform. Without limiting the foregoing, Kaam
      Care specifically disclaims all warranties and representations in any content transmitted on or in connection with
      Kaam Care or on sites that may appear as links on Kaam Care, or in the products provided as a part of, or
      otherwise in connection with, the Kaam Care Platform. No oral advice or written information given by Kaam Care or
      any of its affiliates, employees, officers, directors, agents, or the link will create a warranty.
      {'\n'}
      <Typography weight="semiBold">Advertising Disclosure</Typography>
      {'\n'}
      Kaam Care may contain third party advertisements and links to third party sites. Kaam Care does not make any
      representation as to the accuracy or suitability of any of the information contained in those advertisements or
      sites and does not accept any responsibility or liability for the conduct or content of those advertisements and
      sites and the offerings made by the third parties. We work hard to make sure that ads (if used) are safe,
      unobtrusive, and as relevant as possible. Third party advertisements and links to other sites where goods or
      services are advertised are not endorsements or recommendations by Kaam Care of the third-party sites, goods or
      services. Kaam Care takes not responsibility for the content of any of the ads, promises made, or the
      quality/reliability of the products or services offered in all advertisements.
      {'\n'}
      <Typography weight="semiBold">Testimonials Disclosure</Typography>
      {'\n'}
      Any testimonials provided on Kaam Care Platform are opinions of those providing them. The information provided in
      the testimonials is not to be relied upon to predict results in your specific situation. The results you
      experience will be dependent on many factors including, but not limited to your level of personal responsibility,
      commitment, and abilities, in addition to those factors that you may not be able to anticipate. We will give
      honest testimonials to our visitors regardless of any discount. Any product or service that we test are individual
      experiences, reflecting real life experiences. The testimonials could be displayed on audio, test, or video and
      are not necessarily representative of all of those who will use our products and/or services. Kaam Care does not
      guarantee the same results as the testimonials given on our platform, Testimonials presented on Kaam Care are
      applicable to the individuals writing them, and may not be indicative of future success of any other individuals.
      Please don’t hesitate to contact us if you would like to know more about testimonials, discounts, or any of the
      products/services that we review.
      {'\n'}
      <Typography weight="semiBold">No advice</Typography>
      {'\n'}
      Kaam Care App (“App”) provides only information, this app is not a substitute for medical or treatment advice and
      may not be treated as such by the user. As such, this App may not be relied upon for the purposes of medical
      diagnosis or as a recommendation for medical care or treatment. The information on this App is not a substitute
      for professional medical advice, diagnosis or treatment. All content, including text, graphics, images and
      information, contained on or available through this App is for general information purposes only. Medical
      Information is not legal advice. The information provided on this platform is not legal advice, does not
      constitute a Professional Medical Providers referral service, and no Medical professional provider-client or
      confidential relationship is or will be formed by use of the App.
    </Typography>

    <Typography style={styles.text}>
      <Typography weight="semiBold">Professional Medical Advice and Assistance</Typography>
      {'\n'}
      You are strongly encouraged to confirm any information obtained from or through this App with your physician or
      another professional healthcare provider and to review all information regarding any medical condition or
      treatment with your physician or other a professional healthcare provider.
    </Typography>

    <Typography style={styles.text}>
      <Typography weight="semiBold">No Reliance</Typography>
      {'\n'}
      You must never rely on any information obtained using this app for any diagnosis or recommendation for medical
      treatment. You must never rely on the information received from this app as alternative to medical advice from
      your physician or other professional healthcare provider. You must never disregard professional medical advice or
      delay seeking medical treatment as result of any information you have seen on or accessed through this app. If you
      have any specific questions about any medical matter you should consult your physician or other professional
      healthcare provider. If you think you may be suffering from any medical condition you should seek immediate
      medical attention.
    </Typography>
    <Typography style={styles.text}>
      <Typography weight="semiBold">No Warranty</Typography>
      {'\n'}
      The information provided by this App is provided “as is” without any representations or warranties, express or
      implied. Kaam Care makes no representations or warranties in relation to the medical or other information in this
      App.
      {'\n'}
      <Typography weight="semiBold">Changes to our Disclaimer</Typography>
      {'\n'}
      Should we update, amend, or make any changes to this document so that they accurately reflect our Service and
      policies. Unless otherwise required by law, those changes will be prominently posted here. Then, if you continue
      to use the Service, you will be bound by the updated Disclaimer. If you do not want to agree to this or any
      updated Disclaimer, you can delete your account.
      {'\n'}
      <Typography weight="semiBold">Medical Portfolio Disclaimer</Typography>
      {'\n'}
      The information you input into Kaam Care is under your control.{' '}
      <Typography weight="semiBold">
        Kaam Care is not responsible for the accuracy, completeness, or timeliness of the medical information you
        provide in the app
      </Typography>
      . Users are solely responsible for verifying and updating their health data in consultation with their healthcare
      providers. It is important to note that the Kaam Care app serves as a health management tool, and{' '}
      <Typography weight="semiBold">all medical data must be verified by a licensed medical professional</Typography> to
      ensure its accuracy and relevance. Kaam Care does not provide medical advice or diagnosis.
    </Typography>
    <Typography style={styles.text}>
      <Typography weight="semiBold">Kaam Care does not warrant that:</Typography>
      {'\n'}• The information provided by this App will be constantly available, or available at all; or{'\n'}• The
      information provided by this App is complete, true, accurate, up-to-date, or non-misleading.{'\n'}
      Kaam Care is not responsible or liable for any advice, course of treatment, diagnosis or any other information,
      services or products that you obtain through the use of this app. The accuracy of the data entered in Kaam Care is
      the responsibility of the user.
      {'\n'}
      <Typography weight="semiBold">Contact us</Typography>
      {'\n'}
      Please feel free to contact us if you have questions regarding this disclaimer at{' '}
      <Typography weight="bolder">Kaamcare@gmail.com</Typography>
    </Typography>
    <Typography style={styles.text}>
      By using the app and checking the checkbox you have acknowledged that:{'\n'}• You have read the understand this
      medical disclaimer.{'\n'}• You agree with this medical disclaimer.{'\n'}• You agree to be legally bound by this
      medical disclaimer, which shall take effect immediately upon clicking the checkbox below.{'\n'}
      {'\n'}
      By using Kaam Care that means you agree to the disclaimer and agree/consent to the terms listed above. If you do
      not agree to be legally bound by this medical disclaimer, you may not access the app, register the app under your
      name, or use the app.
    </Typography>
  </ScreenModalLayout>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 16,
  },
});
