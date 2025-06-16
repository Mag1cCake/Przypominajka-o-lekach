import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export default function useScreenDimensions() {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenData(window);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return screenData;
}