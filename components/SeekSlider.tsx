'use client';

import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  onCommit?: () => void;
  max: number;
}


const Slider = ({ value, onChange, onCommit, max }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  const handleCommit = () => {
    onCommit?.();
  }

  return (
    <RadixSlider.Root
      className="relative group flex items-center select-none touch-none w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-44"
      defaultValue={[0]}
      value={[value!]}
      onValueChange={handleChange}
      onValueCommit={handleCommit}
      max={max}
      aria-label="Seek"
    >
      <RadixSlider.Track className="bg-gray-300 relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-gray-900 rounded-full h-full group-hover:bg-orange-500 transition-colors"/>
      </RadixSlider.Track>
      <RadixSlider.Thumb className="hidden group-hover:block transition drop-shadow-sm focus:outline-none w-3 h-3 bg-gray-900 rounded-full"/>
    </RadixSlider.Root>
  );
};
export default Slider;
