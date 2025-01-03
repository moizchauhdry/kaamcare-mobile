import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';

import { Typography } from '../../../UI/Typography/Typography';
import { TextInput } from '../../../UI/Inputs/TextInput/TextInput';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { Button } from '../../../UI/Button/Button';

type AllergyFormProps = {
  onSubmit: (explanation?: string) => void;
  onDelete: () => void;
  explanation?: string;
  edit?: boolean;
  allergyName?: string;
  isPending?: boolean;
};

export const AllergyForm = ({
  allergyName,
  edit,
  explanation: initialExplanation,
  onSubmit,
  onDelete,
  isPending,
}: AllergyFormProps) => {
  const [explanation, setExplanation] = useState(initialExplanation ?? '');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ gap: 32 }}>
        <View style={{ gap: 8 }}>
          <Typography>Explanation</Typography>
          <TextInput
            value={explanation}
            onChangeText={(value) => setExplanation(value)}
            isWide
            maxLength={240}
            style={{ height: 200 }}
            placeholder="Type your explanation here..."
          />
        </View>
        {edit ? (
          <DeletionButton title="Delete Allergy" name={allergyName} listName="Allergies" onProceed={() => onDelete?.()}>
            Delete {allergyName}
          </DeletionButton>
        ) : null}
        <Button onPress={() => onSubmit(explanation)} disabled={isPending}>
          {edit ? 'Update' : 'Save'}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
