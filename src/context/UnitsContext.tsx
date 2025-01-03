import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Units = {
  length: 'FeetInch' | 'Centimeter';
  mass: 'Kilogram' | 'Pound';
  sugar: 'mmolL' | 'mgdL';
  pressure: 'mmHg' | 'kPa';
};

type UnitsContextType = {
  length: 'FeetInch' | 'Centimeter';
  mass: 'Kilogram' | 'Pound';
  sugar: 'mmolL' | 'mgdL';
  pressure: 'mmHg' | 'kPa';
  onUnitChange: (name: keyof Units, value: string) => void;
};

export const UnitsContext = createContext<UnitsContextType>({
  length: 'FeetInch',
  mass: 'Pound',
  sugar: 'mmolL',
  pressure: 'mmHg',
  onUnitChange: () => {},
});

const UNITS_KEY = 'UNITS';

export const UnitsContextProvider = ({ children }: PropsWithChildren) => {
  const [units, setUnits] = useState<Units>({
    length: 'FeetInch',
    mass: 'Pound',
    sugar: 'mmolL',
    pressure: 'mmHg',
  });

  useEffect(() => {
    const restoreState = async () => {
      const data = await AsyncStorage.getItem(UNITS_KEY);
      const state = data ? JSON.parse(data) : undefined;

      if (state !== undefined) {
        setUnits(state);
      }
    };

    restoreState();
  }, []);

  const onUnitChange = (name: keyof Units, value: string) => {
    setUnits((prevState) => {
      const newUnits = { ...prevState, [name]: value };
      saveDataInStorage(newUnits);

      return newUnits;
    });
  };

  const saveDataInStorage = (data: Units) => {
    AsyncStorage.setItem(UNITS_KEY, JSON.stringify(data));
  };

  return (
    <UnitsContext.Provider
      value={{
        length: units.length,
        mass: units.mass,
        sugar: units.sugar,
        pressure: units.pressure,
        onUnitChange,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnitsData = () => {
  const context = useContext(UnitsContext);

  if (context === undefined) {
    throw new Error('UnitsContext must be used within a UnitsContextProvider');
  }

  return context;
};
