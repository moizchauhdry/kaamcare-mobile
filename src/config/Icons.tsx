import circleButton from 'assets/icons/plus-circle-navigation.svg';
import plusCircleButton from 'assets/icons/plus-circle-filled.svg';
import moreHorizontal from 'assets/icons/more-horizontal.svg';
import home from 'assets/icons/home.svg';

type Icons = {
  [key: string]: string;
};

export const icons: Icons = {
  'more-horizontal': moreHorizontal,
  home,
  'circle-button': circleButton,
  'plus-circle-button': plusCircleButton,
};
