import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '../../../components/UI/Typography/Typography';
import { ScreenModalLayout } from '../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';

export const PrivacyPolicyScreen = () => {
  const bolder = (value: string) => <Typography weight="semiBold">{value}</Typography>;
  const boldUnderLine = (value: string) => (
    <Typography weight="semiBold" style={{ textDecorationLine: 'underline' }}>
      {value}
    </Typography>
  );

  return (
    <ScreenModalLayout title="Privacy Policy" isScrollable>
      <Typography style={styles.text}>Effective Date: September 18, 2024</Typography>

      {/* Section 1: Introduction */}
      <Typography style={styles.text}>
        Kaam Care LLC (“we,” “us,” or “our”) shares your concerns about maintaining the integrity and privacy of
        personal information collected on the internet. We are committed to protecting your privacy and this privacy
        policy (“Policy”) is intended to describe our information collection and dissemination practices in connection
        with the Kaam Care Platform (collectively the “Sites”).{'\n'}
        Please review the entire Policy and feel free to contact us using the contact information below if you have any
        questions. By using the Kaam Care Platform, you consent to the collection, use, and disclosure of your
        information in accordance with the Policy. Kaam Care L.L.C., The company has been organized as a California
        Limited liability company under and pursuant to the provisions of law with the filling of the Articles of
        Organization of the company with the secretary of state of California on 02/02/2023. Kaam Care ”) respects and
        promises to protect your privacy. Before you use one or more of the services that we provide (the “Service”), we
        hereby make the following declaration (“Declaration”) to you regarding personal information and privacy
        protection
      </Typography>

      {/* Section 2: Policy Amendments */}
      <Typography weight="semiBold">Policy Amendments</Typography>
      <Typography style={styles.text}>
        We reserve the right to amend this Policy from time to time, at our sole discretion. The most recent version of
        the Policy will always be posted on the website. The updated date of the Policy will be reflected in the
        “Effective Date” heading. We will provide notice to you if these changes are material, and, where required by
        applicable law, we will obtain your consent. Any amendments to the Policy will become effective within 30-days
        upon the display of the modified Policy. We recommend you review this Policy periodically to ensure that you
        understand our most updated privacy practices.
      </Typography>

      <Typography weight="semiBold">1A. Personal Information Security</Typography>
      <Typography style={styles.text}>
        In order to provide you comprehensive and personalized service, in the course of your use of this service, the
        Company may use the following methods to collect, process and use the personal information that you inputted.
        This Declaration will explain the circumstance of information collection, processing and usage. The Company will
        apply all reasonable efforts to strictly protect the safety of your personal information so as to prevent your
        personal information and privacy from being accessed, used or disclosed without authorization. In the event
        there has been a leak of your personal information which has exposed your rights or freedom to substantial risk,
        the Company will inform you of our discovery of the leak.
      </Typography>

      {/* Section 3: Data Collection Table */}
      <Typography weight="semiBold">1B.Data Sets We Collect and For What Purpose</Typography>
      <Typography style={styles.text}>
        You can find here information regarding the purposes for which we process your personal data as well as our
        lawful basis for processing, the definition of “personal” and “non-personal” data, and how it is technically
        processed.
      </Typography>
      <Typography weight="semiBold">Non-Personal Data</Typography>
      <Typography style={styles.text}>
        During your interaction with our website and Services, we may collect aggregated, non-personal non-identifiable
        information, which may be made available or gathered via your access to and use of the Services (“Non-Personal
        Data“). We are not aware of the identity of the user from which the Non-Personal Data is collected. The
        Non-Personal Data being collected may include your aggregated usage information and technical information
        transmitted by your device, such as: the type of browser or device you use, language preference, time and date
        stamp, country location, etc.
      </Typography>
      <Typography weight="semiBold">Personal Data</Typography>
      <Typography style={styles.text}>
        We may also collect from you, directly or indirectly, during your access or interaction with the website or
        Services, individually identifiable information, namely information that identifies an individual or may, with
        reasonable effort, be used to identify an individual (“Personal Data”). The types of Personal Data that we
        collect as well as the purpose for processing and the lawfulness are specified in the table below.{'\n'}
        We do not knowingly collect or process any Personal Data constituting or revealing racial or ethnic origin,
        political opinions, religious or philosophical beliefs, or trade union membership, genetic data, biometric data,
        data concerning a person’s health or data concerning a person’s sex life or sexual orientation (“Special
        Categories of Personal Data”). The table below details the processing of Personal Data, the purpose, lawful
        basis, and processing operations:
      </Typography>

      <View style={{ flex: 1, width: Dimensions.get('window').width * 3 }}>
        <ScrollView horizontal style={{ width: Dimensions.get('window').width }}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Typography style={[styles.tableCell, styles.tableCellHeader]}>Data Set</Typography>
              <Typography style={[styles.tableCell, styles.tableCellHeader]}>Purpose and Operations</Typography>
              <Typography style={[styles.tableCell, styles.tableCellHeader]}>Lawful Basis</Typography>
            </View>

            {/* Table Row 1 */}

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Registration Information: {'\n'}</Typography>
                If you are required to register and create an account through our App, we will collect the Personal Data
                that you are required to provide us during the registry process, such as your full name and email
                address. Further, during the registration process you will be supplied with username and password for
                your account, at which time you thereby represent and warrant that you are responsible for maintaining
                the confidentiality of your details and password. You represent and warrant that you will not provide us
                with inaccurate, misleading or false information.
              </Typography>
              <Typography style={styles.tableCell}>
                This information will be processed for the purpose of performing our contract with you, to set up your
                account with us and enable you to use our Services. In addition, we may process your Personal Data for
                our legitimate interests, for example, to send you marketing and promotional messages and offers related
                to our Services. You are able to unsubscribe from receiving such correspondence from us by contacting us
                at:{' '}
                <Typography weight="bolder" style={{ textDecorationLine: 'underline' }}>
                  Kaamcare@gmail.com
                </Typography>{' '}
                Please note that if you choose to unsubscribe from direct marketing, we may still retain your contact
                details and send you relevant service-related information such as invoices and subscription rates.
              </Typography>
              <Typography style={styles.tableCell}>
                The registration information is processed to perform our contract with you and the direct marketing is
                subject to our legitimate interest.
              </Typography>
            </View>

            {/* Table Row 2 */}
            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Contact Information: {'\n'}</Typography>
                If you voluntarily contact us, you may be required to provide us with certain information such as your
                name, job title, company name, email address (“Contact Information”) and any additional information you
                decide to share with us.
              </Typography>
              <Typography style={styles.tableCell}>
                We will use this data to respond to your inquiry. {'\n'}
                {'\n'}
                <Typography weight="semiBold">Members Club Registration: {'\n'}</Typography>
                If you choose to register to our Members Club, we will you your Contact Information in order to send you
                Offers and marketing materials.
              </Typography>
              <Typography style={styles.tableCell}>
                We process such Contact Information subject to our legitimate interest.{'\n'}
                {'\n'} We may keep such correspondence if we are legally required to.
              </Typography>
            </View>

            {/* Table Row 3 */}
            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">GPS Location Information: {'\n'}</Typography>
                Certain features may require access to your GPS location permissions. In addition, in certain features
                we will use your “Access Fine Location” permission in the background while you are using the App so that
                we are able to locate the wifi networks and connection to provide the Services.
              </Typography>
              <Typography style={styles.tableCell}>
                This information will be processed for the purpose of providing the Services. In addition, we will use
                your Fine Access Location in order to offer you different WIFI networks depend on your location. Please
                note that this information can run in the background of your mobile device, and show you an applicable
                list of WIFI networks. You may choose to block your background location through your device setting.
                Further we wish to clarify that we do not store any GPS Location Information on our servers and any
                processing activity shall be done solely on your device.
              </Typography>
              <Typography style={styles.tableCell}>
                We will process this data solely upon your active explicit consent though in-app notifications.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Push Notifications: {'\n'}</Typography>We may store Firebase Cloud
                Messages token. If you wish to stop getting push notifications, you may do so simply by disabling push
                notifications on your device’s settings or uninstall the app.
              </Typography>
              <Typography style={styles.tableCell}>
                This information will be processed to allow us to send push notifications to users from our server.
              </Typography>
              <Typography style={styles.tableCell}>
                As the token is Non-Personal Data it does not require a lawful basis.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">In-App Payment Information:</Typography>
                {'\n'}When you make a payment through our App and offered Services, all payments are in-app payments and
                are subject to the applicable App Store terms and privacy policy.{'\n'}Google Terms of Service
                {'\n'}Google Privacy Policy{'\n'}App Store Terms of Use{'\n'}App Store Privacy Policy
              </Typography>
              <Typography style={styles.tableCell}>
                We use in app payment processors; the registration and payment information are solely processed by the
                applicable app store provider. We do not store nor process any Personal Data when you process the
                payment.
                {'\n'}We receive an order number which is connected to a user ID which was generated when installing the
                app (non identifiable).
              </Typography>
              <Typography style={styles.tableCell}>
                The Payment Information is processed to perform our contract with you to provide you our Services..
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Log Data and Unique Identifiers:</Typography>
                {'\n'}In case of an error in the App we collect data and information (through third-party service
                providers) such as “Log Data” or “Crash Data”. This data may include information such as your device
                Internet Protocol (“IP”) address, device name, operating system version, the configuration of the App
                when utilizing our Service, the time and date of your use of the Service, and other statistics.
              </Typography>
              <Typography style={styles.tableCell}>
                In most cases, this data will not include Personal Data, however we treat this information as Personal
                Data as we may be able to reasonably identify you.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this data set for our legitimate Interest of protecting our App and Services and optimizing
                the App and Services.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">List of Installed App:</Typography>
                {'\n'}When you install our App, we may collect information from your device, that may include a list of
                your installed Apps.{'\n'}This data may contain identity information and therefore we treat it as
                Personal Data.
              </Typography>
              <Typography style={styles.tableCell}>
                We use this data in order to maintain, support, improve, protect and manage our App and Services.
              </Typography>
              <Typography style={styles.tableCell}>
                We will base the processing of this data set on your consent through the organic in-app permissions
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Profiling Data:</Typography>
                {'\n'}When you use our App we may display advertisements, our partners, the advertisers may place an SDK
                (as detailed below) and collect certain data on you for the purpose of displaying advertisement.
                {'\n'}If you wish to prevent the display of advertisements or other identifiers for interest-based
                advertising, you may change your device settings to reset such advertisement or opt-out of such
                advertising (typically, this is available under the “Privacy” or “Ads” section in your device settings).
                {'\n'}Please note that if you reset your advertising settings or opt-out of interest based advertising,
                you may still see advertisements in our App, but those ads will not be targeted for you. Please note
                that such actions may result in a less enjoyable user experience.
              </Typography>
              <Typography style={styles.tableCell}>
                Our partners will process this data to manage and deliver advertisements more effectively and
                personally, including contextual, behavioral and interests-based advertising based on your activity,
                preferences or other data available to us or to our business partners and advertisers, including for
                re-targeting purposes.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent as required under your jurisdiction provided through
                our cookie manager or similar technologies.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Photos and Videos:</Typography>
                {'\n'}if you use our designated feature in the applicable App in order to provide you with our Services,
                we will ask you to provide us with photos, images or videos of you (collectively “Content”) for editing
                purposes and to create animations. While we cannot prevent you from doing so, we still do not use
                Personal Data from photos for purposes other than providing our Service.
              </Typography>
              <Typography style={styles.tableCell}>
                We process such data to provide you with the Services and to enable the editing and animation function
                that you requested.{'\n'}For example, if you wish to receive altered photographs with animations of
                Emoji, we will use the original photograph you provided us.{'\n'}We keep the original photo and the
                animation for as long as you use the Services.{'\n'}Further we wish to clarify that we do not store any
                of your photos and videos on our servers and any processing activity shall be done solely on your
                device.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent provided through the organic in-app permissions in
                order to execute our contract with you and provide you with our services.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Microphone and audio:</Typography>
                {'\n'}As part of our dialer feature which is provided to certain Apps of ours, you will be required to
                provide us permissions to your Microphone.
              </Typography>
              <Typography style={styles.tableCell}>
                We use those permissions to provide you with our dialer. The microphone permission needs to be
                affirmatively enabled through in-app permission or the mobile settings. You may disable the permissions
                at any time, but depending on the permission you disable, a feature or all features may not function
                properly. We will process the audio and use the microphone solely for providing you the dialer feature
                and we will not store any of your audio.{'\n'}Further, we wish to clarify that we do not store any audio
                file or any information which may be accessed through the microphones and audio permissions on our
                servers and any processing activity shall be done solely on your device.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent provided through the organic in-app permissions in
                order to execute our contract with you and provide you with our services.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Call log and Contacts:</Typography>
                {'\n'}As part of our dialer feature which is provided to certain Apps of ours, you will be required to
                provide us permissions to your call log and contacts.
              </Typography>
              <Typography style={styles.tableCell}>
                We use those permissions to provide you with our dialer and to identify your caller based on your
                contact list. The Call log and contacts permissions need to be affirmatively enabled through in-app
                permission or the mobile settings. You may disable the permissions at any time, but depending on the
                permission you disable, a feature or all features may not function properly.{'\n'}Further, we wish to
                clarify that we do not store any of your contacts or call log on our servers and any processing activity
                shall be done solely on your device.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent provided through the organic in-app permissions in
                order to execute our contract with you and provide you with our services.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Bluetooth and Network:</Typography>
                {'\n'}We may collect through your Bluetooth and network permissions list of devices and networks your
                device “see” and connection history of your device
              </Typography>
              <Typography style={styles.tableCell}>
                We use those permissions to provide you with our Services. The permission needs to be affirmatively
                enabled through in-app permission or the mobile settings. You may disable the permissions at any time,
                but depending on the permission you disable, a feature or all features may not function properly.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent provided through the organic in-app permissions in
                order to execute our contract with you and provide you with our services.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Calendar:</Typography>
                {'\n'}Some of our Apps will provide you with new design features for your device. In order to apply
                those designs, we will need to access your calendar.
              </Typography>
              <Typography style={styles.tableCell}>
                We will use the calendar permission in order to apply the applicable design for your device and
                calendar. The permission needs to be affirmatively enabled through in-app permission or the mobile
                settings. You may disable the permissions at any time, but depending on the permission you disable, a
                feature or all features may not function properly.{'\n'}Further, we wish to clarify that we do not store
                any data processed or may be accessed through the calendar permissions on our servers and any processing
                activity shall be done solely on your device.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent provided through the organic in-app permissions in
                order to execute our contract with you and provide you with our services.
              </Typography>
            </View>

            <View style={styles.tableRow}>
              <Typography style={styles.tableCell}>
                <Typography weight="semiBold">Health Data:</Typography>
                {'\n'}Our Apps may access and process certain health related data. This data shall be solely processed
                on your device and we will not transmit such data to our servers or taking any action which will cause
                the data to leave your device
              </Typography>
              <Typography style={styles.tableCell}>
                We will use this data in order to provide you with certain features and as part of the performance of
                our Apps{'\n'}We process this information based on your consent provided through the organic in-app
                permissions in order to execute our contract with you and provide you with our services.{'\n'}We wish to
                clarify that we do not store any of your contacts or call log on our servers and any processing activity
                shall be done solely on your device.
              </Typography>
              <Typography style={styles.tableCell}>
                We process this information based on your consent provided through the organic in-app permissions in
                order to execute our contract with you and provide you with our services.
              </Typography>
            </View>

            {/* Additional rows as necessary */}
          </View>
        </ScrollView>
      </View>

      <Typography style={styles.text}>
        Please note that the actual <Typography weight="semiBold">processing operation</Typography> per each purpose of
        use and lawful basis detailed in the table above may differ. Such processing operation usually includes a set of
        operations made by automated means, such as collection, storage, use, disclosure by transmission, erasure, or
        destruction. The transfer of personal data to third-party countries, as further detailed in the Data Transfer
        Section, is based on the same lawful basis as stipulated in the table above. In addition, we may use certain
        Personal Data to prevent potentially prohibited or illegal activities, fraud, misappropriation, infringements,
        identity thefts, and any other misuse of the Services and to enforce the Terms, as well as to protect the
        security or integrity of our databases and the Services, and to take precautions against legal liability. Such
        processing is based on our legitimate interests. We may collect different categories of Personal Data and
        Non-Personal Data from you, depending on the nature of your interaction with the Services provided through the
        website and Platform, as detailed above. If we combine Personal Data with Non-Personal Data, the combined
        information will be treated as Personal Data or for as long as it remains combined.
      </Typography>

      {/* Continue with other sections of the Privacy Policy */}
      <Typography weight="semiBold">1C. How We Collect Your Information:</Typography>
      <Typography style={styles.text}>
        Depending on the nature of your interaction with us, we may collect the above detailed information from you, as
        follows: {'\n'}
        {'\n'}• Automatically, We process this information based on your consent provided through the organic in-app
        permissions in order to execute our contract with you and provide you with our services..{'\n'}
        {'\n'}• When you voluntarily choose to provide us with information, such as when you contact us, all as detailed
        in this Policy.{'\n'}
        {'\n'}• Provided from third-parties.
      </Typography>

      <Typography weight="semiBold">2. Purpose of Collection</Typography>
      <Typography style={styles.text}>
        {`To enhance your ability to manage your health records and provide you with more services through sharing data to those that you have authorized to receive the information, the Company may collect personal information from you for the purposes as stated above or for the following purposes:
• Personal insurance
• Marketing
• Health care services
• Emergency aid when traveling abroad
• Consumer and client management and services
• Online shopping and other e-commerce services
• Advertising or commercial conduct management
• Survey, statistics and research analysis
• Other business operations that are compliant with the registered business items or the constitution articles
In the event information is being collected, processed or used for any purpose other than the above, the Company will obtain your consent in advance before proceeding.`}
      </Typography>

      <Typography weight="semiBold">3. Categories and Contents of Information Collected</Typography>
      <Typography style={styles.text}>
        {`The possible categories and contents of the personal information that the Company may collect from you are as follows, but the Company will only collect personal information necessary to meet the aforementioned purposes:
• Information that may identify the person: This includes your name, job title, address, work address, former address, home telephone number, mobile number, instant messenger account, web service account information, service and household registration address, photographs, e-mail address, electronic signature, personal identification card serial number and any other information that may allow identification of the data holder.
• Government information that may identify the person: This includes the passport number, social security number, national ID number, etc.
• Personal descriptions: This includes age, sex, birth date, birthplace, nationality, etc.
• Body descriptions: This includes height, weight, blood type, etc.
• Personal habits: This includes smoking, alcohol consumption, etc.
• Family situation: This includes marital status, offspring, etc.
• Details of other family members: Offspring, persons under care, other relatives, parents, live-ins or any relatives living abroad, etc.
• Recreational activities and interests: This includes hobbies, sports and other interests.
• Lifestyles: This includes types of consumer items and services used, personal or family consumer practices, etc.
• Occupation: All types of jobs and positions.
• Safety and health records: This includes occupational illnesses, safety, accident records, first aid qualifications, emergency medical aid information when traveling abroad, etc.
• Insurance details: This includes insurance type, scope of insurance, insurance amount, term of insurance, expiration date, insurance premiums, insurance payments, etc.
• Health records: This includes medical records, treatment and diagnosis records, test results, the type, level and duration of disability, the Disability Card number, contact person, etc.
• Race or ancestral origin: This includes DNA records.
• Records of Service usage, including but not limited to geographical positioning, usage time, browsing and browser history.`}
      </Typography>

      <Typography weight="semiBold">
        4. Duration, Region, Storage, Target of Method Use, and User Responsibilities
      </Typography>
      <Typography style={styles.text}>
        {`• Duration: Until you request the suspension of usage of your personal information.
 • Region: Areas where the Company or its affiliates are operating 
 • Target and Method:
 • Account information and other non-data portions:
This information shall be stored on Microsoft Azure and used according to the purposes for which such information was collected.
 • Personal physical data, medical records and other medical data:
 • Data storage: The Kaam Care app is connected via API to Microsoft Azure, a secure cloud service provider. While your personal health information is collected through the app, Kaam Care does not store this data on its own servers. All health data is securely stored and managed by Azure, ensuring high levels of protection and compliance with industry standards.
 • Data Usage and sharing: 
 • Your personal information is only used to provide and improve the services offered by Kaam Care. We do not share, sell, or disclose your personal health information to third parties without your explicit consent, except as required by law. 
 • You maintain control over your health data, and no information is shared without your approval.
 • User Responsibilities:
 • You are responsible for keeping your username and password secure to protect your personal information from unauthorized access.
 • By using Kaam Care, you agree to keep your personal health information up-to-date and accurate. It is your responsibility to review, verify, and update your medical information regularly.
`}
      </Typography>

      <Typography weight="semiBold">5. Your Rights</Typography>
      <Typography style={styles.text}>
        {`You may exercise the following rights with respect to your personal information:
 • Inquire or request a review of the information.
 • Request a copy of the information.
 • Request an amendment or correction of the information.
 • Request the suspension of collection, processing or use of the information.
 • Request the deletion of the information.
 • Refuse automated decisions, including profiling.
Please note that if you do not wish to provide your personal information, the Company will be unable to provide you with a part or the entirety of services.
You can contact Kaam Care under the Privacy Dashboard settings to request the exercise of the above rights (such as information deletion), and when you exercise such rights, the Company may request for you to provide relevant supporting information so as to verify your identity.
If you believe that our collection, processing or use of your personal information is inappropriate or in violation of the law, you may submit a complaint to the competent authority or initiate litigation at court.
You understand that the cross-border transmission of your personal information may expose your personal information to a greater degree of risk.`}
      </Typography>

      <Typography weight="semiBold">
        6. United States Residents in certain Territories Have Specific Privacy Right
      </Typography>
      <Typography style={styles.text}>
        {`If you are a resident of California, Colorado, Connecticut, Utah, or Virginia, you are granted specific rights regarding access to your Personal Information, based on the following laws:
 • General Data Protection Regulation (GDPR)
 • Virginia Consumer Data Protection Act (CDPA)
 • California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA)
 • California Online Privacy Protection Act (CalOPPA)
 • Personal Information Protection and Electronic Documents Act (PIPEDA)
 • Colorado Privacy Act (ColoPA)
 • Utah Consumer Privacy Act (UCPA)
 • Connecticut Data Privacy Act (CDPA)`}
      </Typography>

      <Typography weight="semiBold" style={{ fontSize: 21 }}>
        Kaam Care California Privacy Rights
      </Typography>
      <Typography style={styles.text}>
        California residents have certain privacy rights under the California Consumer Privacy Act as amended by the
        California Privacy Rights Act (collectively, CCPA). This notice provides a general overview of the privacy
        rights under the CCPA. Further, it applies generally to all of Kaam Care products and services. For specific
        information about your personal information or how your personal information is processed by a particular Kaam
        Care product please see Privacy section. The CCPA defines certain terms in a particular manner that may differ
        from how those terms are used in everyday language. When these terms are used in this notice, they are used
        based on the definitions set forth in the CCPA. These terms are: "personal information", "consumer", "business
        purpose", "commercial purpose", "service provider", "third party", "share", and "sale" or "sell". For purposes
        of this notice, Kaam Care may be referred to as "us", "our or "we" and Kaam Care consumer customers may be
        referred to as "you" or "your".
      </Typography>

      <Typography weight="semiBold">Summary of CCPA Privacy Rights</Typography>
      <Typography style={styles.text}>
        The CCPA provides California consumers with the following privacy rights. These rights are explained in further
        detail in the sections below.{'\n'}• The {bolder('right to know')} and the right to access the following for the
        preceding 12 month period: categories of personal information we collected, the categories of sources from which
        we collected personal information, the business or commercial purposes for which we collected personal
        information, and the categories of third parties with whom we sell or share personal information, and the pieces
        of personal information we have collected about you.
        {'\n'}• The {bolder('right to delete')} personal information collected that is not needed for specified
        purposes.
        {'\n'}• The {bolder('right to correct')} inaccurate personal information that Kaam Care maintains about you.
        {'\n'}• The {bolder('right to not be discriminated')} against for exercising any of your CCPA rights.
        {'\n'}• The {bolder('right to opt out')} of the selling or sharing of your personal information.
        {'\n'}• The {bolder('right to limit the use or disclosure of sensitive personal information')} for certain
        purposes.{'\n'}
        You may exercise your right to know, right to delete, right to correct, and right to opt out of sale or sharing
        by logging into your Kaam Care Privacy Dashboard.
      </Typography>

      <Typography weight="semiBold">Right to Know and Access</Typography>
      <Typography style={styles.text}>
        Under the CCPA, California consumers have the right to know and access the following information for the
        preceding 12 month period:
        {'\n'}• the {boldUnderLine('information')} collected or used, disclosed for a business purpose, or otherwise
        sold or shared;
        {'\n'}• the {boldUnderLine('business purposes')} for collecting or sharing personal information;
        {'\n'}• the {boldUnderLine('commercial purposes')} for collecting, selling or sharing personal information;
        {'\n'}• the {boldUnderLine('categories of sources')} of personal information;
        {'\n'}• the {boldUnderLine('categories of service providers')} to which personal information is disclosed for a
        business purpose;
        {'\n'}• the {boldUnderLine('categories of third parties')} to which personal information is sold or shared; and
        {'\n'}• the specific pieces of personal information collected or used. You may access this information by
        logging into your Kaam Care Privacy Dashboard.
      </Typography>

      <Typography style={styles.text}>
        <Typography weight="semiBold">Categories of Personal Information:</Typography> Kaam Care may collect, use,
        disclose for a business purpose, or otherwise sell or share different categories of personal information
        depending on the product or service, if consent is given. You may locate the specific categories of personal
        information for each product or service by logging into your Kaam Care Privacy Dashboard. Below is the full list
        of categories of personal information that Kaam Care may collect, use, disclose, if Consent is given, for the
        following: a business purpose or otherwise sell or share: identifiers (e.g., technical, financial, government
        identifiers); contact information; physical characteristics or description information; internet or electronic
        network activity information; geolocation information; commercial information; audio, electronic, visual,
        thermal, olfactory or similar information; biometric information; inferences, including advertising and content
        related inferences; medical information or health insurance information; professional or employment related
        information; education information; legally protected classifications; and other information that identifies or
        can be reasonably associated or linked with you.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Business Purposes:</Typography> Kaam Care may disclose personal information to
        service providers for the following business purposes: auditing; security; debugging; short-term transient use;
        performing services on behalf of Kaam Care; research; and quality assurance and service improvements.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Commercial Purposes:</Typography> Kaam Care may sell or share personal information
        with third parties (if consent is given) for the following commercial purposes: delivering content; associating
        user activity; provide Kaam Care services; provide, provide personalized content; fulfill user requests; user
        communication; provide location-based services; provide promotions; create analytics and reports for third
        parties; processing payments; and security and fraud prevention.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Categories of Sources:</Typography> Kaam Care collects personal information from
        the following categories of sources: Kaam Care websites and apps; external party websites and apps where Kaam
        Care technologies serves content measurement; third party data partners; Kaam Care services; and websites, apps
        or other public sources.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Categories of Service Providers:</Typography> Kaam Care may disclose personal
        information for a business purpose with the following categories of service providers: analytics providers;
        social button providers; application providers; content providers; payment providers; search partners; voice and
        digital assistant providers; and security partners.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Categories of Third Parties:</Typography> Kaam Care may sell or share personal
        information for a commercial purpose with the following categories of third parties: analytics providers; social
        button providers; application providers; advertising partners; content providers; game developers; payment
        providers; search partners; voice and digital assistant providers; and security partners.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Specific Pieces of Information:</Typography> Please visit your Kaam Care Privacy
        Dashboard to access the specific pieces of information collected by Kaam Care. Please note that due to the
        nature of Kaam Care services, we are not able to adequately verify the identity of a non-registered user. As a
        result, only users who are able to authenticate themselves through their account can access the specific pieces
        of information at this time.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Delete</Typography>
        {'\n'}
        You may request that Kaam Care delete personal information we have collected from you by logging into your Kaam
        Care Privacy Dashboard. If your Kaam Care account has Sub-profiles, you will need to exercise your deletion
        right with each sub-profile which you wish to delete.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Correct Inaccurate Personal Information</Typography>
        {'\n'}
        You have the right to correct inaccurate information that we maintain about you. You may exercise this right by
        contacting us.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Not Be Discriminated Against</Typography>
        {'\n'}
        You have the right to receive information about the financial incentives that we offer to you (if any). Kaam
        Care does not and will not discriminate against you because you exercise any of the CCPA rights described here.
        We will not deny goods or services, charge different prices or rates for goods or services, or provide you with
        a different level or quality of goods or services as a result of you exercising any CCPA rights described here.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Opt Out of Selling or Sharing</Typography>
        {'\n'}
        Kaam Care does not sell or share information that, on its own, identifies you, like your name or email address.
        As outlined in our Privacy Policy, if consent is given by you, we do share other identifiers with partners for
        product, service and advertising reasons. Sharing this information allows us to provide the content and services
        you enjoy, helps our partners deliver better content and advertising, and keeps our services supported by our
        advertisers. Under the California Consumer Privacy Act some of this sharing may be considered a "sale" that you
        have a right to opt out of. You have the right to direct Kaam Care not to sell or share your personal
        information. You may direct Kaam Care not to sell or share your personal information by turning off the "allow
        the 'sale' or 'sharing' of my Personal Information" control in your Kaam Care Privacy Dashboard. If you choose
        to opt out of selling or sharing, such action may impact how you are able to view and/or receive some services
        that Kaam Care offers. This is because some of the services that Kaam Care offers require disclosure of your
        personal information to third parties, and such disclosure may be deemed selling or sharing under the CCPA. Kaam
        Care sells or shares different categories of personal information to third parties depending on the product or
        service. You may locate the specific categories of personal information sold or shared in the last 12 months for
        each product or service you use by logging into your Kaam Care Privacy Dashboard. Across all of our products and
        services, if consent is given, Kaam Care may sell or share the following categories of personal data to third
        parties: identifiers (e.g., technical, financial, government identifiers); contact information; physical
        characteristics or description information; internet or electronic network activity information; geolocation
        information; commercial information; audio, electronic, visual, thermal, olfactory or similar information;
        inferences, including advertising and content related inferences; professional or employment related
        information.
      </Typography>

      <Typography weight="semiBold" style={{ fontSize: 21 }}>
        Kaam Care Colorado Privacy Rights
      </Typography>
      <Typography style={styles.text}>
        Colorado Residents have certain Privacy Rights under Colorado's Privacy Act of 2021, also known as the CPA. This
        notice provides a general overview of the privacy rights under the CPA. Further, it applies generally to all of
        Kaam Care products and services. For specific information about your personal data or how your personal data is
        processed by a particular Kaam Care product or service you may interact with, please login to the Kaam Care
        Privacy Dashboard. The CPA defines certain terms in a particular manner that may differ from how those terms are
        used in everyday language. When these terms are used in this notice, they are used based on the definition set
        forth in the CPA. These terms are "personal data", "consumer", "controller", "processor", "sensitive data",
        "targeted advertising", "third party", and "sale" or "sell". Please note that Kaam Care uses the terms "personal
        data" and "personal information" interchangeably throughout our policies. For purposes of this page, Kaam Care
        may be referred to as "us", "our" or "we" and Kaam Care consumer customers may be referred to as "you" or
        "your". Summary of CPA Privacy Rights The CPA provides Colorado consumers with the following five privacy
        rights. These rights are explained in further detail in the sections below.
        {'\n'}• The {bolder('right to opt out')} of processing of personal data for the following purposes:
        {'\n'}
        {'\t'}• Targeted advertising;
        {'\n'}
        {'\t'}• The sale of personal data; or
        {'\n'}
        {'\t'}• Profiling in furtherance of decisions that produce legal or similarly significant effects concerning the
        consumer.
        {'\n'}• {bolder('Right of access')}
        {'\n'}• {bolder('Right to correction')}
        {'\n'}• {bolder('Right to deletion')}
        {'\n'}• {bolder('Right to data portability')}
        You may exercise your right to confirm and access, and right to opt out of Targeted advertising and sale of
        personal data by logging into your Kaam Care Privacy Dashboard.
      </Typography>
      <Typography style={styles.text}>
        <Typography weight="semiBold">Right of Access</Typography>
        {'\n'}
        Under the CPA, Colorado consumers have the right to confirm a controller's processing of their personal data and
        access such personal data. You may access this data by logging into your Kaam Care Privacy Dashboard. If you do
        not have a Kaam Care login, Kaam Care is unable to confirm the ownership of personal data and will not be able
        to provide you with access.
        {'\n'}
        <Typography weight="semiBold">Categories of personal data:</Typography> If your consent is given, Kaam Care may
        collect, use, disclose, or otherwise sell or share different categories of personal data depending on the
        product or services. You may locate the specific categories of personal data for each product or service by
        logging into your Kaam Care Privacy Dashboard. Below is the list of categories of personal data that Kaam Care
        may, sell or share: identifiers (e.g., technical, financial, government identifiers); contact information;
        physical characteristics or description information; internet or electronic network activity information;
        geolocation information; commercial information; audio, electronic, visual, thermal, olfactory or similar
        information; biometric information; inferences, including advertising and content related inferences; medical
        information or health insurance information; professional or employment related information; education
        information; legally protected classifications; and other information that identifies or can be reasonably
        associated or linked with you.
        {'\n'}
        <Typography weight="semiBold">Purposes for processing personal data:</Typography> Kaam Care may process your
        personal data for the following purposes: auditing; security and fraud prevention; debugging; short-term
        transient use; performing services on behalf of Kaam Care; research; quality assurance service improvements;
        delivering content,; associating user activity; providing Kaam Care services; providing contextual advertising;
        providing targeted advertising; providing personalized content; fulfilling user requests; for user
        communication; providing location-based services; providing promotions; creating analytics and reports for third
        parties; and payment processing.
        {'\n'}
        <Typography weight="semiBold">Categories of third parties:</Typography> If you consent is given Kaam Care may
        sell or share personal data of our consumers with the following categories of third parties: analytics
        providers; social button providers; application providers; advertising partners; content providers; game
        developers; payment providers; search partners; voice and digital assistant providers; and security partners.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Correct</Typography>
        {'\n'}
        Under the CPA, Colorado consumers have the right to correct inaccuracies in their personal data, by contacting
        us.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Delete</Typography>
        {'\n'}
        You may request that Kaam Care delete personal information we have collected from you by logging into your Kaam
        Care Privacy Dashboard. If your Kaam Care account has Sub-profiles, you will need to exercise your deletion
        right with each sub-profile which you wish to delete.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Data Portability</Typography>
        {'\n'}
        You may request Kaam Care to provide you with a copy of the personal data that you previously provided. You may
        access this data by logging into the Kaam Care Privacy Dashboard,
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Opt Out of Selling or Targeted Advertising</Typography>
        {'\n'}
        Kaam Care does not sell or share data that, on its own, identifies you, like your name or email address. We do
        share other identifiers with partners for product, service and targeted Research reasons. Sharing this data
        allows us to provide the content and services you enjoy, helps our partners deliver better content and keeps our
        services supported. You have the right to direct Kaam Care not to sell your personal data and to not use your
        personal data for targeted advertising. You may direct Kaam Care to opt you out of selling your personal data
        and using your personal data for targeted advertising above or via the sale of personal data and targeted
        advertising control in the Privacy Dashboard. If you choose to opt out of the sale of your personal data, such
        action may impact how you are able to view and/or receive some services that Kaam Care offers. This is because
        some of the services that Kaam Care offers require disclosure of your personal data to third parties and such
        disclosure may be deemed selling under the CPA. Kaam Care sells or shares different categories of personal
        information to third parties depending on the product or service. You may locate the specific categories of
        personal data sold or shared in the last 12 months for each product or service you use by logging into the Kaam
        Care Privacy Dashboard. Kaam Care does not process personal data for the purposes of profiling in furtherance of
        decisions that produce legal or similarly significant effects concerning the consumer. Across all of our
        products and services, if consent is given, Kaam Care may sell or share the following categories of personal
        data to third parties: identifiers (e.g., technical, financial, government identifiers); contact information;
        physical characteristics or description information; internet or electronic network activity information;
        geolocation information; commercial information; audio, electronic, visual, thermal, olfactory or similar
        information; inferences, including advertising and content related inferences; professional or employment
        related information.
      </Typography>

      <Typography weight="semiBold" style={{ fontSize: 21 }}>
        Kaam Care Connecticut Privacy Rights
      </Typography>
      <Typography style={styles.text}>
        Connecticut residents have certain privacy rights under the Connecticut Data Privacy Act (CTPA). This notice
        provides a general overview of the privacy rights under the CTPA. Further, it applies generally to all of Kaam
        Care products and services. For specific information about your personal data or how your personal data is
        processed by a particular Kaam Care product or service you may interact with, please log into the Kaam Care
        Privacy Dashboard. The CTPA defines certain terms in a particular manner that may differ from how those terms
        are used in everyday language. When these terms are used in this notice, they are used based on the definitions
        set forth in the CTPA. These terms are: "personal data", "process", "consumer", "processor", "controller",
        "third party", "sale" or "sell", and "targeted advertising". Please note that Kaam Care uses the terms "personal
        data" and "personal information" interchangeably throughout our policies. For purposes of this notice, Kaam Care
        may be referred to as "us", "our" or "we" and Kaam Care consumer customers may be referred to as "you" or
        "your". Targeted Advertising and Sale of Personal Data While we don't sell directly identifying information like
        your name, phone number or email address, we do share your technical identifiers in order to provide more
        relevant services, content to you. This could be considered a "sale" as defined under Connecticut law. We also
        share information with and collect information from partners for the purpose of Research. Connecticut law gives
        you the right to opt out of this. To do so, select "Don't Allow". In addition, we may still disclose your
        information with our processors in accordance with Connecticut law and our privacy policy.
        {'\n'}• Allow
        {'\n'}• Do Not Allow Summary of CTPA Privacy Rights The CTPA provides Connecticut consumers with the following
        privacy rights. These rights are explained in further detail in the sections below
        {'\n'}• The {bolder('right to confirm')} whether or not Kaam Care is processing your personal data and access to
        such personal data.
        {'\n'}• The {bolder('right to correct')} inaccuracies in your personal data, taking into account the nature of
        the personal data and the purposes of the processing of your personal data.
        {'\n'}• The {bolder('right to delete')} personal data provided by, or obtained about, you.
        {'\n'}• The {bolder('right to obtain')} a copy of your personal data processed by Kaam Care, in a portable and,
        to the extent technically feasible, readily usable format that allows you to transmit the data to another
        controller without hindrance, where the processing is carried out by automated means, provided Kaam Care shall
        not be required to reveal any trade secret.
        {'\n'}• The {bolder('right to opt out')} of the processing of your personal data for the following purposes:
        {'\n'}
        {'\t'}• Targeted advertising;
        {'\n'}
        {'\t'}• The sale of personal data, subject to the terms set forth below; or
        {'\n'}
        {'\t'}• profiling in furtherance of solely automated decisions that produce legal or similarly significant
        effects concerning you
        {'\n'}You may exercise your right to confirm or access, right to correct, right to delete, right to obtain a
        copy, and right to opt out of sale by logging into your Kaam Care Privacy Dashboard.
      </Typography>

      <Typography style={styles.text}>
        <Typography weight="semiBold">Right to Confirm and Access</Typography>
        {'\n'}
        Under the CTPA, Connecticut consumers have the right to confirm and access the following information:{'\n'}• the
        categories of personal data processed by Kaam Care and shared with third parties;{'\n'}• the purposes for
        processing personal data;{'\n'}• how you may exercise your rights, including how you may appeal Kaam Care
        decision with regard to your request;{'\n'}• the categories of third parties, if any, which Kaam Care shares
        personal data; and{'\n'}• an active electronic mail address that you may use to contact Kaam Care.{'\n'}
        {'\n'}
        <Typography weight="semiBold">Categories of personal data:</Typography> Kaam Care may process or otherwise sell
        or share different categories of personal data depending on the product or service. You may locate the specific
        categories of personal data for each product or service by logging into your Kaam Care Privacy Dashboard. Below
        is the list of categories of personal data that Kaam Care may process or otherwise sell or share with third
        parties: identifiers (e.g., technical, financial, government identifiers); contact information; physical
        characteristics or description information; internet or electronic network activity information; geolocation
        information; commercial information; audio, electronic, visual, thermal, olfactory or similar information;
        biometric information; inferences, including advertising and content related inferences; medical information or
        health insurance information; professional or employment related information; education information; legally
        protected classifications; and other information that identifies or can be reasonably associated or linked with
        you.
        {'\n'}
        <Typography weight="semiBold">Processing Purposes:</Typography> Kaam Care may disclose personal data to
        processors for the following purposes: auditing; security; debugging; short-term transient use; performing
        services on behalf of Kaam Care; research; and quality assurance and service improvements. Kaam Care may sell or
        share personal data with third parties for the following purposes: delivering content; associating user
        activity; provide Kaam Care services;; provide targeted advertising; provide personalized content; fulfill user
        requests; user communication; provide location-based services; provide promotions; create analytics and reports
        for third parties; processing payments; and security and fraud prevention.
        {'\n'}
        <Typography weight="semiBold">Categories of Third Parties:</Typography> Kaam Care may sell or share personal
        data with the following categories of third parties: analytics providers; social button providers; application
        providers; advertising partners; content providers; game developers; payment providers; search partners; voice
        and digital assistant providers; and security partners.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Correct Inaccurate Personal Data</Typography>
        {'\n'}
        You have the right to correct inaccurate information that we maintain about you, taking into account the nature
        of the personal data and the purposes of the processing of your personal data. You may exercise this right by
        logging into your Kaam Care Privacy Dashboard or contacting us at the information provided below.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Delete</Typography>
        {'\n'}
        You may request that Kaam delete personal data we have collected about you by logging into your Kaam Care
        Privacy Dashboard. If you exercise your right to delete your data, the CTPA allows Kaam Care to retain certain
        personal data for limited purposes. As a result, Kaam Care may retain your personal data in accordance with our
        records retention program to: comply with federal, state, or municipal ordinances or regulations; comply with a
        civil, criminal, or regulatory inquiry, investigation, subpoena, or summons by federal, state, municipal, or
        other governmental authorities; reasonably and in good faith cooperate with law enforcement agencies;
        investigate, establish, exercise, prepare for, or defend legal claims; provide a product or service that you
        specifically requested or perform a contract with you; protect the interests essential for your or another
        person's life or physical safety; prevent, detect, protect against, or respond to security incidents, identity
        theft, fraud, harassment, or other malicious, deceptive, or illegal activities, preserve the integrity or
        security of systems or investigate, report, or prosecute those responsible for any such action; engage in public
        or peer reviewed scientific or statistical research in the public interest; assist another controller,
        processor, or third party with any of Kaam Care obligations under the CTPA; process personal data for reasons of
        public interest in the area of public health, community health, or population health; conduct internal research
        to develop, improve, or repair products, services, or technology; effectuate a product recall; identify and
        repair technical errors that impair existing or intended functionality; perform internal operations that are
        reasonably aligned with your expectations or reasonably anticipated based on your existing relationship with
        Kaam Care; or engage in public or peer-reviewed scientific or statistical research in the public interest that
        adheres to all other applicable ethics and privacy laws and is approved, monitored and governed by an
        institutional review board.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Opt Out of Selling or Targeted Advertising</Typography>
        {'\n'}
        Kaam Care does not sell or share information that, on its own, identifies you, like your name or email address.
        As outlined in our Privacy Policy, we do share other identifiers with partners for product, service, and
        advertising reasons. Sharing this data allows us to provide the content and services you enjoy, helps our
        partners deliver better content and advertising, and keeps our services supported by our advertisers. You have
        the right to direct Kaam Care not to sell your personal data and not to use your personal data for targeted
        advertising. You may direct Kaam Care not to sell your personal data and using your personal data for targeted
        advertising above or via the sale of personal data and targeted advertising control in the Privacy Dashboard.
        Note, if you opt out of Targeted Advertising on Kaam Care, under the CTPA Kaam Care may still show you ads,
        including personalized advertisements based on your interactions with the family of Kaam Care products. If you
        choose to opt out of the sale of your personal data, such action may impact how you are able to view and/or
        receive some services that Kaam Care offers. This is because some of the services that Kaam Care offers require
        disclosure of your personal data to third parties, and such disclosure may be deemed selling under the CTPA.
        Kaam Care sells or shares different categories of personal data to third parties depending on the product or
        service. You may locate the specific categories of personal data sold or shared in the last 12 months for each
        product or service you use by logging into your Kaam Care Privacy Dashboard Across all of our products or
        services, Kaam Care sells or shares the following categories of personal data to third parties: identifiers
        (e.g., technical, financial, government identifiers); contact information; physical characteristics or
        description information; internet or electronic network activity information; geolocation information;
        commercial information; audio, electronic, visual, thermal, olfactory or similar information; inferences,
        including advertising and content related inferences; professional or employment related information. If you
        choose to opt out of selling, Kaam Care may continue to sell your personal data under the following limited
        exceptions: the sale is reasonably necessary to enable a third party to provide a benefit to which you are
        entitled; the sale of personal data to third parties is clearly disclosed in the terms of the program; and the
        third party uses the personal data only for purposes of facilitating such a benefit to which you are entitled
        and does not retain or otherwise use or disclose the personal data for any other purpose.
      </Typography>

      <Typography weight="semiBold" style={{ fontSize: 21 }}>
        Kaam Care Utah Privacy Rights
      </Typography>

      <Typography style={styles.text}>
        Utah Residents have certain privacy rights under the Utah Consumer Privacy Act (UCPA). This notice provides a
        general overview of the privacy rights under the UCPA. Further, it applies generally to all of Kaam Care's
        products and services. For specific information about your personal data or how your personal data is processed
        by a particular Kaam Care product or service you may interact with, please log into the Kaam Care Privacy
        Dashboard. The UCPA defines certain terms in a particular manner that may differ from how those terms are used
        in everyday language. When these terms are used in this notice, they are used based on the definition set forth
        in the UCPA. These terms are: "personal data", "process", "consumer", "processor", "controller", "third party",
        "sale" or "sell", and "targeted advertising". Please note that Kaam Care uses the terms "personal data" and
        "personal information" interchangeably throughout our policies. For purposes of this notice, Kaam Care may be
        referred to as "us", "our" or "we" and Kaam Care's consumer customers may be referred to as "you" or "your".
        Summary of UCPA Privacy Rights The UCPA provides Utah consumers with the following privacy rights. These rights
        are explained in further detail in the sections below.
        {'\n'}• The {bolder('right to confirm')} whether or not Kaam Care is processing your personal data and access to
        such personal data.
        {'\n'}• The {bolder('right to access and delete')} personal data provided by you.
        {'\n'}• The {bolder('right to obtain')} a copy of the your personal data that the you previously provided to
        Kaam Care, in a format that, to the extent technically feasible is portable and, to the extent practicable, is
        readily usable, that allows you to transmit the data to another controller without impediment, where there
        processing is carried out by automated means, provided that Kaam Care shall not be required to reveal any trade
        secret.
        {'\n'}• The {bolder('right to opt out')} of the processing of your personal data for the following purposes:
        {'\n'}
        {'\t'}• Targeted advertising;
        {'\n'}
        {'\t'}• The sale of personal data, subject to the terms set forth below;
        {'\n'}Right to Confirm and Access
        {'\n'}Under the UCPA, Utah consumers have the right to confirm the processing of and access the following
        information:
        {'\n'}• The categories of personal data processed by Kaam Care and shared with third parties;
        {'\n'}• The purposes for processing personal data;
        {'\n'}• How you may exercise your rights; and
        {'\n'}• The categories of third parties, if any, which Kaam Care shares personal data.
      </Typography>

      <Typography style={styles.text}>
        <Typography weight="semiBold">Categories of personal data:</Typography> Kaam Care may process or otherwise sell
        or share different categories of personal data spending on the product or service. You may locate the specific
        categories of personal data for each product or service by logging into your Kaam Care Privacy Dashboard Below
        is the list of categories of personal data that Kaam Care may process or otherwise sell or share with third
        parties: identifiers (e.g., technical, financial, government identifiers); contact information; physical
        characteristics or description information; internet or electronic network activity information; geolocation
        information; commercial information; biometric information; inferences, including advertising and content
        related inferences; medical information or health insurance information; professional or employment related
        information; education information; legally protected classifications; and other information that identifies you
        or can be reasonably associated or linked with you.
        {'\n'}
        <Typography weight="semiBold">Processing Purposes:</Typography> Kaam Care may disclose personal data to
        processors for the following purposes: auditing; security; debugging; short-term transient use; performing
        services on behalf of Kaam Care; research; and quality assurance and service improvements. Kaam Care may sell or
        share personal data with third parties for the following purposes: delivering content and ads; associating user
        activity; provide Kaam Care services; provide contextual advertising; provide targeted advertising; provide
        personalized content; fulfill user requests; user communication; provide location-based services; provide
        promotions; create analytics and reports for third parties; processing payments; and security and fraud
        prevention.
        {'\n'}
        <Typography weight="semiBold">Categories of Third Parties:</Typography> Kaam Care may sell or share personal
        data with the following categories of third parties: analytics providers; social button providers; application
        providers; advertising partners; content providers; game developers; payment providers; search partners; voice
        and digital assistant providers; and security partners.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Delete</Typography>
        {'\n'}
        You may request that Kaam Care delete personal data you have provided to us by logging into your Kaam Care
        Privacy Dashboard. If you have more than one registered account with Kaam Care (for example, a Kaam Care and an
        AOL account), you will need to exercise your deletion right within each registered account for which you wish to
        delete your personal data. If you exercise your right to delete your personal data, the UCPA allows Kaam Care to
        retain certain personal data for limited purposes. As a result, Kaam Care may retain your personal data in
        accordance with our records retention program to: Comply with a federal, state, or local law, rule or
        regulation; comply with a civil, criminal, or regulatory inquiry, investigation, subpoena, or summons by a
        federal, state, local or other governmental entity; cooperate with a law enforcement agency concerning activity
        that the controller or processor reasonably and in good faith believes may violate federal, state, or local
        laws, rules, or regulations; investigate, establish, exercise, prepare for, or defend a legal claim; provide a
        product or service requested by a consumer or a parent or legal guardian of a child; perform a contract to which
        the consumer or the parent or legal guardian of a child is a party, including fulfilling the terms of a written
        warranty or taking steps at the request of the consumer or parent or legal guardian before entering into the
        contract with the consumer; take immediate steps to protect an interest that is essential for the life or
        physical safety of the consumer or of another individual; detect, prevent, protect against, or respond to a
        security incident, identity theft, fraud, harassment, malicious or deceptive activity, or any illegal activity;
        preserve the integrity or security of systems; investigate, report, or prosecute a person responsible for
        harming or threatening the integrity or security of systems; engage in public or peer-reviewed scientific,
        historical, or statistical research in the public interest that adheres to all other applicable ethics and
        privacy laws; process personal data to: conduct internal analytics or other research to develop, improve, or
        repair a product, service or technology; identify and repair technical errors that impair existing or intended
        functionality; effectuate a product recall; process personal data to perform an internal operation reasonably
        aligned with consumer's expectations or otherwise compatible with processing to aid in providing a product or
        service specifically requested by a consumer or a parent or legal guardian of a child or the performance of a
        contract to which the consumer or a parent or legal guardian of a child is a party; or retain a consumer's email
        address to comply with the consumer's request to exercise a right.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Opt Out of Selling or Targeted Advertising</Typography>
        {'\n'}
        Kaam Care does not sell or share information that, on its own, identifies you, like your name or email address.
        As outlined in our Privacy Policy, we do share other identifiers with partners for product, service, and
        advertising reasons. Sharing this data allows us to provide the content and services you enjoy, helps our
        partners deliver better content and advertising, and keeps our services supported by our advertisers. You have
        the right to direct Kaam Care not to sell your personal data and not to use your personal data for targeted
        advertising. You may direct Kaam Care not to sell your personal data and using your personal data for targeted
        advertising above or via the sale of personal data and targeted advertising control in the Privacy Dashboard. If
        you choose to opt out of the sale of your personal data, such action may impact how you are able to view and/or
        receive some services that Kaam Care offers. This is because some of the services that Kaam Care offers require
        disclosure of your personal data to third parties, and such disclosure may be deemed selling under the UCPA.
        Kaam Care sells or shares different categories of personal data to third parties depending on the product or
        service. You may locate the specific categories of personal data sold or shared in the last 12 months for each
        product or service you use by logging into your Kaam Care Privacy Dashboard Across all of our products or
        services, Kaam Care sells or shares the following categories of personal data to third parties: identifiers
        (e.g., technical, financial, government identifiers); contact information; physical characteristics or
        description information; internet or electronic network activity information; geolocation information;
        commercial information; audio, electronic, visual, thermal, olfactory or similar information; inferences,
        including advertising and content related inferences; professional or employment related information. If you
        choose to opt out of selling, Kaam Care may continue to sell your personal data under the following limited
        exceptions: the sale is reasonably necessary to enable a third party to provide a benefit to which you are
        entitled; the sale of personal data to third parties is clearly disclosed in the terms of the program; and the
        third party uses the personal data only for purposes of facilitating such a benefit to which you are entitled
        and does not retain or otherwise use or disclose the personal data for any other purpose.
      </Typography>

      <Typography weight="semiBold" style={{ fontSize: 21 }}>
        Kaam Care Virginia Privacy Rights
      </Typography>

      <Typography style={styles.text}>
        Virginia Residents have certain Privacy Rights under Virginia's Consumer Data Protection Act of 2021, also known
        as the VCDPA. This notice provides a general overview of the privacy rights under the VCDPA. Further, it applies
        generally to all of Kaam Care's products and services. For specific information about your personal data or how
        your personal data is processed by a particular Kaam Care product or service you may interact with, please login
        to the Kaam Care Privacy Dashboard,, accessible from the Kaam Care Privacy Policy. Please note that Kaam Care
        considers personal data to be the same as Personal Information. The VCDPA defines certain terms in a particular
        manner that may differ from how those terms are used in everyday language. When these terms are used in this
        notice, they are used based on the definition set forth in the VCDPA. These terms are "personal data",
        "consumer", "controller", "processor", "sensitive data", "targeted advertising", "third party", and "sale" or
        "sell". For purposes of this page, Kaam Care may be referred to as "us", "our" or "we" and Kaam Care's consumer
        customers may be referred to as "you" or "your". Summary of VCDPA Privacy Rights The VCDPA provides Virginia
        consumers with the following five privacy rights. These rights are explained in further detail in the sections
        below.
        {'\n'}• The {bolder('right to confirm')} whether or not a controller is processing the consumer's personal data
        and right to access such personal data.
        {'\n'}• The {bolder('right to correct')} inaccuracies in the consumer's personal data, taking into account the
        nature and purpose of processing of personal data.
        {'\n'}• The {bolder('right to delete')} personal data provided by or obtained about the consumer.
        {'\n'}• The {bolder('right to obtain')} a copy of personal data that the consumer previously provided to the
        controller.
        {'\n'}• The {bolder('right to opt out')} of processing of personal data for the following purposes:
        {'\n'}
        {'\t'}• Targeted advertising{'\n'}
        {'\t'}• The sale of personal data; or{'\n'}
        {'\t'}• Profiling in furtherance of decisions that produce legal or similarly significant effects concerning the
        consumer.{'\n'}
        {'\n'}
        You may exercise your right to confirm and access, and right to opt out of Targeted advertising and sale of
        personal data by logging into your Kaam Care Privacy Dashboard. Right to Confirm and Access Under the VCDPA,
        Virginia consumers have the right to confirm a controller's processing of their personal data and access such
        personal data. You may access this data by logging into your Kaam Care Privacy Dashboard. If you do not have a
        Kaam Care login, Kaam Care is unable to confirm the ownership of personal data and will not be able to provide
        you with access. You can see the types of data Kaam Care generally collects via our Privacy Policy.
      </Typography>

      <Typography style={styles.text}>
        <Typography weight="semiBold">Categories of personal data:</Typography> Kaam Care may collect, use, disclose, or
        otherwise sell or share different categories of personal data depending on the product or service a consumer
        uses. You may locate the specific categories of personal data for each product or service by logging into your
        Kaam Care Privacy Dashboard. Below is the full list of categories of personal data that Kaam Care may collect,
        use, disclose for a business purpose or otherwise sell or share: identifiers (e.g., technical, financial,
        government identifiers); contact information; physical characteristics or description information; internet or
        electronic network activity information; geolocation information; commercial information; audio, electronic,
        visual, thermal, olfactory or similar information; biometric information; inferences, including advertising and
        content related inferences; medical information or health insurance information; professional or employment
        related information; education information; legally protected classifications; and other information that
        identifies or can be reasonably associated or linked with you. Purposes for processing personal data: Kaam Care
        may process your personal data for the following purposes: auditing; security and fraud prevention; debugging;
        short-term transient use; performing services on behalf of Kaam Care; research; quality assurance service
        improvements; delivering content and ads; associating user activity; providing Kaam Care services; providing
        contextual advertising; providing targeted advertising; providing personalized content; fulfilling user
        requests; for user communication; providing location-based services; providing promotions; creating analytics
        and reports for third parties; and payment processing.
        {'\n'}
        <Typography weight="semiBold">Categories of third parties:</Typography> Kaam Care may sell or share personal
        data of our consumers with the following categories of third parties: analytics providers; social button
        providers; application providers; advertising partners; content providers; game developers; payment providers;
        search partners; voice and digital assistant providers; and security partners.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Correct</Typography>
        {'\n'}
        Under the VCDPA, Virginia consumers have the right to correct inaccuracies in their personal data. You may
        correct certain data via Kaam Care Privacy Dashboard.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Delete</Typography>
        {'\n'}
        You may request that Kaam Care delete personal data we have collected about you by logging into your Kaam Care
        Privacy Dashboard. If you have more than one registered account with Kaam Care, you will need to exercise your
        deletion right within each registered account for which you wish to delete your personal data. If you exercise
        your right to delete your data, the VCDPA allows Kaam Care to retain your personal data for limited purposes. As
        a result, Kaam Care may retain your personal data in accordance with our records retention program to: comply
        with federal, state, or local laws, rules or regulations; comply with a legal inquiry, investigation, subpoena,
        or summons by federal, state, local, or other governmental authorities; reasonably and in good faith cooperate
        with law enforcement agencies; investigate, establish, exercise, prepare for, or defend legal claims; provide a
        product or service that you request, or perform a contract with you; protect the interests essential for your or
        another person's life or physical safety; prevent, detect, protect against, or respond to security incidents,
        fraud, harassment, or other malicious or illegal activities; engage in peer-reviewed scientific or statistical
        research in the public interest; conduct internal research to develop, improve, or repair products or services;
        or debug our products and services to identify and repair existing or intended functionality.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Obtain a Copy of Personal Data</Typography>
        {'\n'}
        You may request Kaam Care to provide you with a copy of the personal data that you previously provided to Kaam
        Care. You may access this data by logging into the Kaam Care Privacy Dashboard, accessible from the Kaam Care
        Privacy Policy.
        {'\n'}
        {'\n'}
        <Typography weight="semiBold">Right to Opt Out of Selling or Targeted Advertising</Typography>
        {'\n'}
        Kaam Care does not sell or share data that, on its own, identifies you, like your name or email address. As
        outlined in our Privacy Policy, we do share other identifiers with partners for product, service and targeted
        advertising reasons. Sharing this data allows us to provide the content and services you enjoy, helps our
        partners deliver better content and advertising, and keeps our services supported by our advertisers. You have
        the right to direct Kaam Care not to sell your personal data and to not use your personal data for targeted
        advertising. You may direct Kaam Care to opt you out of selling your personal data and using your personal data
        for targeted advertising above or via the sale of personal data and targeted advertising control in the Privacy
        Dashboard. If you choose to opt out of the sale of your personal data, such action may impact how you are able
        to view and/or receive some services that Kaam Care offers. This is because some of the services that Kaam Care
        offers require disclosure of your personal data to third parties and such disclosure may be deemed selling under
        the VCDPA. Kaam Care sells or shares different categories of personal information to third parties depending on
        the product or service. You may locate the specific categories of personal data sold or shared in the last 12
        months for each product or service you use by logging into the Kaam Care Privacy Dashboard. Kaam Care does not
        process personal data for the purposes of profiling in furtherance of decisions that produce legal or similarly
        significant effects concerning the consumer. Across all of our products and services, Kaam Care sells or shares
        the following categories of personal data to third parties: identifiers (e.g., technical, financial, government
        identifiers); contact information; physical characteristics or description information; internet or electronic
        network activity information; geolocation information; commercial information; audio, electronic, visual,
        thermal, olfactory or similar information; inferences, including advertising and content related inferences;
        professional or employment related information. Use of Precise Geolocation Information in Virginia The Virginia
        Consumer Data Protection Act requires consumer consent for the collection of precise location data for certain
        commercial uses. Kaam Care honors this legal requirement by truncating latitude and longitude coordinate
        information from geolocation data that falls within the state of Virginia. This converts the data into imprecise
        location data. Virginia residents do not need to manage or effectuate their Precise Location Information opt-out
        in Kaam Care's Privacy Dashboard to receive this privacy protection. Verification Process for Access and
        Deletion You may access and/or delete your personal data by logging into the Kaam Care Privacy Dashboard.
      </Typography>

      <Typography weight="semiBold">7. Collection, Use, and Linking of Technical Identifiers</Typography>

      <Typography style={styles.text}>
        {`Kaam Care uses different technical identifiers to make its consumer services available on most platforms, browsers, and devices. Kaam Care also uses these technical identifiers to provide our digital services on our properties and for our business partners.
These technical identifiers include:
• Browser cookie identifiers (sometimes referred to as “cookie IDs”) and browser local storage identifiers
• Mobile device identifiers, such as the Android advertising ID or the Apple Identifier for Advertising (IDFA)
• Platform or operating system-based identifiers, such as those offered on smart or connected TVs or media streaming devices
• Partner-supplied technical identifiers
• Encrypted or one-way cryptographic hashes of personal information such as email addresses, phone numbers, account identifiers, derivatives, or escalated versions of these identifiers
• Household-based identifiers
• IP addresses
• Probabilistic (non-unique) identifiers
• Identifiers generated from the combination of various device, browser, or operating system attributes, such as the operating system or browser version
• “Cohort”, audience, or group identifiers, such as “sports enthusiasts”

The storage, generation, and collection methods of these identifiers may also vary, depending on the context. For instance, some browsers and devices offer limited technical identifier support and/or limited cookie support, so non-cookie-based identifiers may be used in these cases. Examples of these devices include:
• Certain apps, mobile devices, or installed software, where permitted and applicable
• Certain internet-of-things (IoT) devices
• Browsers enabled with intelligent tracking prevention (ITP), privacy sandbox, or similar cookie-blocking technology`}
      </Typography>

      <Typography weight="semiBold">8. Children’s Privacy</Typography>
      <Typography style={styles.text}>
        Children’s Online Privacy Protection Act (COPPA) applies to Operators of websites or online services that
        collect data from children under the age of 13. COPPA, prohibits unfair or deceptive acts related to the
        collection, use or disclosure of personal information from and about children on the internet. The goal of COPPA
        is to give parents control over what information is collected from their young children online. We recognize the
        need to provide further privacy protections with respect to personal information we may collect from children on
        our sites and applications. Some of the features on our sites and applications are age-gated so that they are
        not available for use by children, and we do not knowingly collect personal information from children in
        connection with those features. When we intend to collect personal information from children, we take additional
        steps to protect children’s privacy, including:{'\n'}• Notifying parents about our information practices with
        regard to children, including the types of personal information we may collect from children, the uses to which
        we may put that information, and whether and with whom we may share that information;{'\n'}• In accordance with
        applicable law, and our practices, obtaining consent from parents for the collection of personal information
        from their children, or for sending information about our products and services directly to their children;
        {'\n'}• Limiting our collection of personal information from children to no more than is reasonably necessary to
        participate in an online activity; and{'\n'}• Giving parents access or the ability to request access to personal
        information we have collected from their children and the ability to request that the personal information be
        changed or deleted.
        {'\n'}
      </Typography>
      <Typography weight="semiBold">9. Amendments to this Declaration</Typography>
      <Typography style={styles.text}>
        You agree that the Company may make amendments to this Declaration at any time, which will be announced on the
        Kaam Care platform. If you continue to use this service after the public announcement or direct notification, it
        shall be deemed that you have consented to those amendments.
      </Typography>

      {/* Add more content from the privacy policy here */}
    </ScreenModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 16,
  },
  table: {
    width: Dimensions.get('window').width * 3,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 20,
  },
  tableRow: {
    width: Dimensions.get('window').width * 3,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    backgroundColor: '#f7f7f7',
  },
  tableCell: {
    width: Dimensions.get('window').width,
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  tableCellHeader: {
    fontWeight: 'bold',
  },
});
