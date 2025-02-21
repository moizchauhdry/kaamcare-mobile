import { theme } from '../../../config/Theme';
import type { GraphStage, MoreDataGraphStage } from '../../../model/medicalLogs/MedicalLogsCommon';

export const pulseGraphStages: GraphStage[] = [
  {
    label: 'Normal',
    color: '#34C759',
    conditionType: 'AND',
    advice: '',
    scopes: [
      {
        min: 60,
        max: 100,
        key: 'pulse',
      },
    ],
    index: 0,
    exclusiveAdvices: [
      {
        title: '',
        description: '',
        titleColor: '',
      },
    ],
  },
];

export const graphStages: GraphStage[] = [
  {
    index: 0,
    label: 'Hypotension',
    color: '#007AFF',
    conditionType: 'OR',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    exclusiveAdvices: [
      {
        title: 'Increase fluid intake',
        description:
          'Maintain good hydration by drinking an adequate amount of water, fruit juices, or electrolyte beverages to help stabilize blood pressure.',
        titleColor: '#FF9647',
      },
      {
        title: 'Adjust Body Positions',
        description:
          'Especially when transitioning from lying or sitting to standing, do so slowly to avoid sudden changes that may lead to dizziness and lightheadedness.',
        titleColor: '#FF9647',
      },
      {
        title: 'Eat Small, Frequent Meals',
        description:
          'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
        titleColor: '#FF9647',
      },
      {
        title: 'Avoid Hot Baths and High Temperatures',
        description:
          'Prolonged exposure to high temperatures can cause blood pressure to drop. Be mindful of maintaining a comfortable environment.',
        titleColor: '#FF9647',
      },
      {
        title: 'Monitor Symptoms',
        description:
          'If you experience frequent dizziness, lightheadedness, weakness, or persistent discomfort, seek medical advice promptly.',
        titleColor: '#FF9647',
      },
      {
        title: 'Important Note',
        description:
          'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid problems.',
        titleColor: '#07406B',
      },
    ],
    scopes: [
      {
        min: 0,
        max: 89,
        key: 'systolic',
      },
      {
        min: 0,
        max: 59,
        key: 'diastolic',
      },
    ],
  },
  {
    index: 1,
    label: 'Normal',
    color: '#34C759',
    conditionType: 'AND',
    advice: 'Great! Your blood pressure is in the healthy range. Just keep it!',
    exclusiveAdvices: [
      {
        title: 'Lifestyle Modifications',
        description:
          'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and limiting salt and saturated fat intake.',
        titleColor: '#FF9647',
      },
      {
        title: 'Weight Management',
        description:
          'If you are overweight, losing even a small amount of weight can have a positive impact on blood pressure.',
        titleColor: '#FF9647',
      },
      {
        title: 'Reduce Sodium Intake',
        description:
          'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
        titleColor: '#FF9647',
      },
      {
        title: 'Manage Stress',
        description:
          'Prolonged exposure to high temperatures can cause blood pressure to drop. Be mindful of maintaining a comfortable environment.',
        titleColor: '#FF9647',
      },
      {
        title: 'Limit Alcohol and Caffeine',
        description: 'Excessive alcohol and caffeine consumption can impact blood pressure. Moderation is key.',
        titleColor: '#FF9647',
      },
      {
        title: 'Important Note',
        description:
          'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid problems.',
        titleColor: '#07406B',
      },
    ],
    scopes: [
      {
        min: 90,
        max: 119,
        key: 'systolic',
      },
      {
        min: 60,
        max: 79,
        key: 'diastolic',
      },
    ],
  },
  {
    index: 2,
    label: 'Pre-hypertension',
    color: '#F8AE11',
    conditionType: 'AND',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    exclusiveAdvices: [
      {
        title: 'Lifestyle Modifications',
        description:
          'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and limiting salt and saturated fat intake.',
        titleColor: '#FF9647',
      },
      {
        title: 'Weight Management',
        description:
          'If you are overweight, losing even a small amount of weight can have a positive impact on blood pressure.',
        titleColor: '#FF9647',
      },
      {
        title: 'Reduce Sodium Intake',
        description:
          'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
        titleColor: '#FF9647',
      },
      {
        title: 'Manage Stress',
        description:
          'Prolonged exposure to high temperatures can cause blood pressure to drop. Be mindful of maintaining a comfortable environment.',
        titleColor: '#FF9647',
      },
      {
        title: 'Limit Alcohol and Caffeine',
        description: 'Excessive alcohol and caffeine consumption can impact blood pressure. Moderation is key.',
        titleColor: '#FF9647',
      },
      {
        title: 'Important Note',
        description:
          'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid problems.',
        titleColor: '#07406B',
      },
    ],
    scopes: [
      {
        min: 120,
        max: 129,
        key: 'systolic',
      },
      {
        min: 60,
        max: 79,
        key: 'diastolic',
      },
    ],
  },
  {
    index: 3,
    label: 'Hypertension Stage 1',
    color: '#FF8102',
    conditionType: 'OR',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    exclusiveAdvices: [
      {
        title: 'Lifestyle Modifications',
        description:
          'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and limiting salt and saturated fat intake.',
        titleColor: '#FF9647',
      },
      {
        title: 'Weight Management',
        description:
          'If you are overweight, losing even a small amount of weight can have a positive impact on blood pressure.',
        titleColor: '#FF9647',
      },
      {
        title: 'Reduce Sodium Intake',
        description:
          'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
        titleColor: '#FF9647',
      },
      {
        title: 'Manage Stress',
        description:
          'Prolonged exposure to high temperatures can cause blood pressure to drop. Be mindful of maintaining a comfortable environment.',
        titleColor: '#FF9647',
      },
      {
        title: 'Limit Alcohol and Caffeine',
        description: 'Excessive alcohol and caffeine consumption can impact blood pressure. Moderation is key.',
        titleColor: '#FF9647',
      },
      {
        title: 'Important Note',
        description:
          'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid problems.',
        titleColor: '#07406B',
      },
    ],
    scopes: [
      {
        min: 130,
        max: 139,
        key: 'systolic',
      },
      {
        min: 80,
        max: 89,
        key: 'diastolic',
      },
    ],
  },
  {
    index: 4,
    label: 'Hypertension Stage 2',
    color: '#FF9647',
    conditionType: 'OR',
    advice: `Attention! If you've got 3 or more results in the range, your doctor's advice and immediate medical treatment are necessary.`,
    exclusiveAdvices: [
      {
        title: 'Lifestyle Modifications',
        description:
          'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and limiting salt and saturated fat intake.',
        titleColor: '#FF9647',
      },
      {
        title: 'Weight Management',
        description:
          'If you are overweight, losing even a small amount of weight can have a positive impact on blood pressure.',
        titleColor: '#FF9647',
      },
      {
        title: 'Reduce Sodium Intake',
        description:
          'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
        titleColor: '#FF9647',
      },
      {
        title: 'Manage Stress',
        description:
          'Prolonged exposure to high temperatures can cause blood pressure to drop. Be mindful of maintaining a comfortable environment.',
        titleColor: '#FF9647',
      },
      {
        title: 'Limit Alcohol and Caffeine',
        description: 'Excessive alcohol and caffeine consumption can impact blood pressure. Moderation is key.',
        titleColor: '#FF9647',
      },
      {
        title: 'Important Note',
        description:
          'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid problems.',
        titleColor: '#07406B',
      },
    ],
    scopes: [
      {
        min: 140,
        max: 180,
        key: 'systolic',
      },
      {
        min: 90,
        max: 120,
        key: 'diastolic',
      },
    ],
  },
  {
    index: 5,
    label: 'Hypertension Crisis',
    color: '#E84420',
    conditionType: 'OR',
    advice: 'We are worried about you, please call emergency services immediately.',
    exclusiveAdvices: [
      {
        title: 'Lifestyle Modifications',
        description:
          'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and limiting salt and saturated fat intake.',
        titleColor: '#FF9647',
      },
      {
        title: 'Weight Management',
        description:
          'If you are overweight, losing even a small amount of weight can have a positive impact on blood pressure.',
        titleColor: '#FF9647',
      },
      {
        title: 'Reduce Sodium Intake',
        description:
          'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
        titleColor: '#FF9647',
      },
      {
        title: 'Manage Stress',
        description:
          'Prolonged exposure to high temperatures can cause blood pressure to drop. Be mindful of maintaining a comfortable environment.',
        titleColor: '#FF9647',
      },
      {
        title: 'Limit Alcohol and Caffeine',
        description: 'Excessive alcohol and caffeine consumption can impact blood pressure. Moderation is key.',
        titleColor: '#FF9647',
      },
      {
        title: 'Important Note',
        description:
          'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid problems.',
        titleColor: '#07406B',
      },
    ],
    scopes: [
      {
        min: 180,
        max: Infinity,
        key: 'systolic',
      },
      {
        min: 120,
        max: Infinity,
        key: 'diastolic',
      },
    ],
  },
];

export const bloodPressureModalData: MoreDataGraphStage = {
  Hypotension: {
    title: 'Your blood pressure is low. If it continues, please see a doctor in time!',
    data: [
      {
        name: 'Increase Fluid Intake',
        text: 'Maintain good hydration by drinking an adequate amount of water, fruit juices, or electrolyte beverages to help stabilize blood pressure.',
      },
      {
        name: 'Adjust Body Position',
        text: 'Especially when transitioning from lying or sitting to standing, do so slowly to avoid sudden changes that may lead to dizziness and lightheadedness.',
      },
      {
        name: 'East Small, Frequent Meals',
        text: 'Distribute your meals throughout the day and opt for smaller portions to prevent excessive drops in blood pressure. Avoid becoming too hungry or overeating.',
      },
      {
        name: 'Avoid Hot Baths and High Temperatures',
        text: 'Prolonged exposure to high temperatures can cause blood vessels to dilate and blood pressure to drop. Be mindful of maintaining a comfortable environment',
      },
      {
        name: 'Monitor Symptoms',
        text: 'If you experience frequent dizziness, lightheadedness, weakness, or persistent discomfort, seek medical advice promptly',
      },
      {
        name: 'Important Note',
        text: 'Low blood pressure can be a symptom of other underlying issues, such as anemia, cardiovascular problems, or thyroid abnormalities. If you frequently experience symptoms of low blood pressure, it’s essential to consult a doctor to identify the underlying cause and receive appropriate treatment advice.',
      },
    ],
  },
  Normal: {
    title: 'Your blood pressure is normal, keep it!',
    data: [
      {
        name: 'Lifestyle Modifications',
        text: 'Adopt a healthy lifestyle by incorporating regular physical activity, maintaining a balanced diet rich in fruits, vegetables, and whole grains, and limiting salt intake.',
      },
      {
        name: 'Weight Management',
        text: 'If you are overweight, lowing even a modest amount of weight can help lower blood pressure and reduce risk of developing hypertension.',
      },
      {
        name: 'Reduce Stress',
        text: 'Chronic stress can contribute to elevated blood pressure. Practice stress-reducing techniques such as meditation, deep breathing exercises, or engaging in hobbies you enjoy.',
      },
      {
        name: 'Limit Alcohol and Caffeine',
        text: 'Excessive alcohol and caffeine consumption can impact blood pressure. Moderation is key.',
      },
      {
        name: 'Quit Smoking',
        text: 'If you smoke, consider quitting, as smoking can contribute to high blood pressure and increase the risk of cardiovascular diseases.',
      },
      {
        name: 'Monitor Regularly',
        text: 'Keep track of your blood pressure regularly at home or through regular check-ups with your healthcare provider. This helps to assess the effectiveness of lifestyle changes and any necessary medical interventions.',
      },
      {
        name: 'Follow Medical Advice',
        text: 'If your healthcare provider recommends medications or other interventions to manage your blood pressure, adhere to their advice and treatment plan.',
      },
      {
        name: 'Important Note',
        text: 'Always consult with your healthcare professional for personalized advice guidance on managing your blood pressure, as individual health conditions may vary, and they can provide the best recommendations based on your specific needs.',
      },
    ],
  },
  'Pre-hypertorsion': {
    title:
      'Your blood pressure is a little high. Please maintain a healthy lifestyle and measure your blood pressure in time!',
    data: [
      {
        name: 'Lifestyle Modifications',
        text: 'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and limiting salt and saturated fat intake.',
      },
      {
        name: 'Weight Management',
        text: 'If you are overweight, losing even a small amount of weight can have a positive impact on blood pressure.',
      },
      {
        name: 'Reduce Sodium Intake',
        text: 'Lower your daily sodium intake to help prevent further increase in blood pressure. Aim for less than 2,300 mg of sodium per day (and even lower if your doctor recommends it).',
      },
      {
        name: 'Manage Stress',
        text: 'Chronic stress can contribute to elevated blood pressure. Find stress-reducing techniques that work for you, such as meditation, deep breathing exercises, or engaging in hobbies you enjoy.',
      },
      {
        name: 'Limit Alcohol and Caffeine',
        text: 'Reducing alcohol and caffeine consumption can help control blood pressure levels.',
      },
      {
        name: 'Monitor Blood Pressure',
        text: 'Regularly check and record your blood pressure at home or through regular check-ups with your healthcare provider. This allows you to track your progress and the effectiveness of lifestyle changes or medical interventions.',
      },
      {
        name: 'Quit Smoking',
        text: 'If you smoke, consider quitting, as smoking can raise high blood pressure and increase the risk of heart disease.',
      },
      {
        name: 'Follow Medical Advice',
        text: 'If necessary, your healthcare provider may recommend medications to manage elevated blood pressure. It’s essential to adhere to their advice and take prescribed medications as directed.',
      },
      {
        name: 'Maintain Regular Medical Check-ups',
        text: 'Visit your healthcare provider for routine check-ups and blood pressure monitoring. Regular monitoring helps identify any changes in your condition and allows for appropriate adjustments to your treatment plan.',
      },
      {
        name: 'Important Note',
        text: 'Always work closely with your healthcare professional to develop a comprehensive plan to manage elevated blood pressure effectively. They can provide personalized advice and guidance based on your health status and help you achieve and maintain optimal blood pressure levels.',
      },
    ],
  },
  'Hypertension Stage 1': {
    title:
      'Your blood pressure is high, please pay attention to your diet and lifestyle! If this continues, please see a doctor!',
    data: [
      {
        name: 'Lifestyle Modifications',
        text: 'Adopt a healthy lifestyle to help manage elevated blood pressure. This includes regular physical activity, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and reducing salt and saturated fat intake.',
      },
      {
        name: 'Weight Management',
        text: 'If you are overweight, losing weight can significantly lower blood pressure and reduce the risk of complications.',
      },
      {
        name: 'Sodium Restriction',
        text: 'Lower your daily sodium intake to less than 2,300 mg (and even lower if advised by your doctor). Reducing salt consumption can have a positive impact on blood pressure.',
      },
      {
        name: 'Stress Management',
        text: 'Chronic stress can contribute to hypertension. Incorporate stress-reducing techniques into your daily routine, such as meditation, yoga, or deep breathing exercises.',
      },
      {
        name: 'Limit Alcohol and Caffeine',
        text: 'Reduce alcohol and caffeine consumption, as they can temporarily raise blood pressure.',
      },
      {
        name: 'Quit Smoking',
        text: 'If you smoke, quitting is essential for managing hypertension and reducing the risk of heart disease and other complications.',
      },
      {
        name: 'Medication Adherence',
        text: 'If your healthcare provider prescribes medications to manage hypertension, take them as directed and do not skip doses.',
      },
      {
        name: 'Regular Blood Pressure Monitoring',
        text: 'Monitor your blood pressure regularly at home or through regular check-ups with your healthcare provider. Regular monitoring helps you track your progress and the effectiveness of lifestyle changes or medications.',
      },
      {
        name: 'Attend Medical Check-ups',
        text: 'Regularly visit your healthcare provider for routine check-ups and blood pressure monitoring. This helps detect any changes in your condition and allows for appropriate adjustments to your treatment plan.',
      },
      {
        name: 'Follow Your Doctor’s Advice',
        text: 'Work closely with your healthcare professional to develop a comprehensive plan to manage hypertension effectively. They can provide personalized advice and guidance based on your health status.',
      },
      {
        name: 'Important Note',
        text: 'It’s crucial to take hypertension seriously and manage it effectively to reduce the risk of complications such as heart disease, stroke, and kidney problems. Follow your doctor’s recommendations and maintain a healthy lifestyle to keep your blood pressure under control.',
      },
    ],
  },
  'Hypertension Stage 2': {
    title:
      'Your blood pressure is high, please pay attention to your diet and lifestyle! If this continues, please see a doctor!',
    data: [
      {
        name: 'Medical Evaluation',
        text: 'Schedule an appointment with your healthcare provider immediately to assess your overall health and determine the best course of action for managing your hypertension.',
      },
      {
        name: 'Lifestyle Modifications',
        text: 'Continue or adopt healthy lifestyle changes, including regular exercise, maintaining a balanced diet with plenty of fruits, vegetables, and whole grains, and reducing sodium and saturated fat intake. Weight Management is crucial, especially if you are overweight.',
      },
      {
        name: 'Medication Management',
        text: 'In Hypertension Stage 2, your healthcare provider may prescribe medications to help lower your blood pressure. Take the prescribed medications as directed and inform your doctor of any side effects or concerns.',
      },
      {
        name: 'Sodium Restriction',
        text: 'Limit your daily sodium intake to less than 2,300 mg (and even lower if advised by your doctor). Reducing salt consumption can have a significant impact on blood pressure.',
      },
      {
        name: 'Stress Management',
        text: 'Practice stress-reducing techniques regularly, such as meditation, yoga, or deep breathing exercises, to help manage hypertension.',
      },
      {
        name: 'Limit Alcohol and Caffeine',
        text: 'Reduce alcohol and caffeine consumption, as they can temporarily raise blood pressure.',
      },
      {
        name: 'Quit Smoking',
        text: 'If you smoke, quitting is essential for managing hypertension and reducing the risk of heart disease and other complications.',
      },
      {
        name: 'Regular Blood Pressure Monitoring',
        text: 'Monitor your blood pressure regularly at home or through regular check-ups with your healthcare provider. Regular monitoring helps track your progress and the effectiveness of lifestyle changes or medications.',
      },
      {
        name: 'Attend Medical Check-ups',
        text: 'Regularly visit your healthcare provider for routine check-ups and blood pressure monitoring. Frequent follow-ups are crucial to evaluate your progress and adjust treatment plans as needed.',
      },
      {
        name: 'Comply with Medical Recommendations',
        text: 'It’s vital to adhere to your healthcare provider’s advice and treatment plan to effectively manage hypertension and reduce the risk of complications.',
      },
      {
        name: 'Important Note',
        text: 'Managing Hypertension Stage 2 requires a comprehensive approach involving life style changes, medications management, and close monitoring under the guidance of a healthcare professional. By taking proactive steps, you can significantly improve your blood pressure levels and overall health. Always work closely with your doctor to address any concerns and ensure your receive the best care for your specific condition.',
      },
    ],
  },
  'Hypertension Crisis': {
    title: 'Your blood pressure is seriously high, please seek the help of a doctor in time!',
    data: [
      {
        name: 'Call Emergency Services',
        text: 'If you are experiencing a severe headache, chest pain, shortness of breath, or any other symptoms of a hypertensive emergency, call emergency services (Such as 911 in the United States) immediately.',
      },
      {
        name: 'Do Not Delay Seeking Help',
        text: 'Hypertensive Crisis can lead to serious complications like stroke, heart attack, or organ damage. Do not hesitate to seek medical attention.',
      },
      {
        name: 'Avoid Activities that Elevated Blood Pressure',
        text: 'During a hypertensive crisis, avoid any activities that could further elevated your blood pressure, such as heavy lifting or strenuous exercise.',
      },
      {
        name: 'Take Medications as Prescribed',
        text: 'If you are already taking blood pressure medications, do not discontinue them. Take your prescribed medications as directed by your healthcare provider.',
      },
      {
        name: 'Avoid Sodium and Caffeine',
        text: 'During a hypertensive crisis, it’s crucial to avoid high-sodium foods and beverages, as well as caffeine, which can exacerbate high blood pressure',
      },
      {
        name: 'Stay Calm and Relaxed',
        text: 'Stress and anxiety can contribute to elevated blood pressure. Try to remain as calm and relaxed as possible while waiting for medical assistance.',
      },
      {
        name: 'Important Note',
        text:
          'Remember Hypertensive Crisis is a medical emergency that requires immediate attention. Do not attempt to manage this condition on your own. Seek medical help promptly to receive appropriate treatment and prevent further complications.\n' +
          'To prevent hypertensive crisis and manage hypertension in general, it is crucial to work closely with your healthcare provider to develop a comprehensive treatment plan. This may include lifestyle changes, medications, and regular monitoring of your blood pressure. Managing hypertension effectively can significantly reduce the risk of complications and improve your overall health.  Always follow your doctor’s advice and attend regular medical check-ups to monitor your blood pressure and overall health status.',
      },
    ],
  },
};
