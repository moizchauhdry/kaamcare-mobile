import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';
import type { QueryKey } from '@tanstack/react-query/build/modern';

type ElementWithAttachmentDataContextType = {
  sectionName?: string;
  elementId?: string;
  name?: string;
  sectionTypeName?: string;
  keyList: QueryKey;
  keySingle?: QueryKey;
};

export const ElementWithAttachmentDataContext = createContext<ElementWithAttachmentDataContextType>({
  sectionName: '',
  elementId: '',
  sectionTypeName: '',
  name: '',
  keyList: [],
  keySingle: [],
});

export const ElementWithAttachmentDataProvider = ({
  sectionName,
  name,
  elementId,
  keySingle,
  sectionTypeName,
  keyList,
  children,
}: PropsWithChildren<ElementWithAttachmentDataContextType>) => (
  <ElementWithAttachmentDataContext.Provider
    value={{
      keySingle,
      name: name || 'medical-history',
      keyList,
      sectionName,
      elementId,
      sectionTypeName,
    }}
  >
    {children}
  </ElementWithAttachmentDataContext.Provider>
);

export const useElementWithAttachmentData = () => {
  const context = useContext(ElementWithAttachmentDataContext);

  if (context === undefined) {
    throw new Error('ElementWithAttachmentDataContext must be used within a ElementWithAttachmentDataProvider');
  }

  return context;
};
