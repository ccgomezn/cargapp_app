import React from 'react';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const InputSlider = ({
  minVal, maxVal, step, multiValue, onValuesChange,
}) => (
  <MultiSlider
    values={[multiValue[0], multiValue[1]]}
    sliderLength={300}
    onValuesChange={values => onValuesChange(values)}
    min={minVal}
    isMarkersSeparated
    max={maxVal}
    step={step}
    allowOverlap
    snapped
    valuePrefix="$"
    trackStyle={{
      backgroundColor: '#deecff',
    }}
    selectedStyle={{
      backgroundColor: '#1E94EA',
    }}
    touchDimensions={{
      height: 50,
      width: 50,
      borderRadius: 20,
      slipDisplacement: 400,
    }}
    markerStyle={{
      height: 25,
      width: 25,
      borderRadius: 20,
      backgroundColor: '#007aff',
    }}
    pressedMarkerStyle={{
      backgroundColor: '#28B3CC', // '#1E94EA',
    }}
  />
);

InputSlider.propTypes = {
  minVal: PropTypes.number.isRequired,
  maxVal: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  multiValue: PropTypes.array.isRequired,
  onValuesChange: PropTypes.func.isRequired,
};

export default InputSlider;
