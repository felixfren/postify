'use client';

import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  max: number;
}


const Slider = ({ value, onChange, max }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  return (
    <RadixSlider.Root
      className="relative group flex items-center select-none touch-none w-full"
      defaultValue={[0]}
      value={[value!]}
      onValueChange={handleChange}
      max={max}
      step={0.01}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-700 relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full group-hover:bg-emerald-500 transition-colors"/>
      </RadixSlider.Track>
      <RadixSlider.Thumb className="hidden group-hover:block transition drop-shadow-sm focus:outline-none w-3 h-3 bg-white rounded-full"/>
    </RadixSlider.Root>
  );
};
export default Slider;
