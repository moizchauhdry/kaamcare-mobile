import type { ScreeningExamFormData } from '../../../schemas/forms/primaryPrevention/screeningExam';
import type { NewScreeningExam, ScreeningExam } from '../../api/primaryPrevention/ScreeningExam';

export const parseScreeningExamFormToApiData = (
  data: ScreeningExamFormData,
  name: string,
  isCommonName: boolean,
): NewScreeningExam => ({
  date: {
    day: data.day ? parseInt(data.day, 10) : null,
    month: data.month ? parseInt(data.month, 10) : null,
    year: data.year ? parseInt(data.year, 10) : null,
  },
  explanation: data.explanation || null,
  attachments: data.attachment && data.attachment.length > 0 ? data.attachment : null,
  name,
  isCommonName,
});

export const parseScreeningExamApiToFormData = (data: ScreeningExam): ScreeningExamFormData => ({
  day: data?.date?.day?.toString() ?? '',
  month: data.date?.month?.toString() ?? '',
  year: data.date?.year?.toString() ?? '',
  explanation: data.explanation || '',
  attachment: data.attachments,
});
