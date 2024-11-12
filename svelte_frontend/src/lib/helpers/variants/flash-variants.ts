import {tv} from 'tailwind-variants';

export const flashVariants = tv({
  base: 'w-[80vw] sm:w-96 py-3 px-2 rounded backdrop-filter backdrop-blur-sm flex flex-col gap-2 border-b-2 select-none hover:shadow-lg relative',
  variants: {
    type: {
      success: 'border-green-500 bg-green-800',
      error: 'border-red-800 bg-red-950',
      warning: 'border-orange-500 bg-orange-700',
      info: 'border-cyan-800 bg-cyan-950'
    }
  }
})

export const flashIconVariants = tv({
  base: 'flex justify-start align-middle items-start text-stone-400 h-4 w-4',
  variants: {
    type: {
      success: 'text-green-400',
      error: 'text-red-400',
      warning: 'text-yellow-400',
      info: 'text-cyan-400'
    }
  }
})

export const flashExitButtonVariants = tv({
  base: 'flex items-center mt-1 justify-center h-4 w-4 text-xs focus:scale-75 duration-200 ml-auto absolute -right-2 -top-2 rounded-full',
  variants: {
    type: {
      success: 'text-green-400 hover:text-green-300 bg-green-700',
      error: 'text-red-400 hover:text-red-300 bg-red-700',
      warning: 'text-yellow-400 hover:text-yellow-300 bg-yellow-700',
      info: 'text-cyan-400 hover:text-cyan-300 bg-cyan-700'
    }
  }
})

export const flashMessageVariants = tv({
  base: 'text-sm font-medium text-left',
  variants: {
    type: {
      success: 'text-green-200',
      error: 'text-red-200',
      warning: 'text-yellow-200',
      info: 'text-cyan-200'
    }
  }
})

export const flashActionVariants = tv({
  base: 'text-sm text-center underline cursor-pointer ml-auto',
  variants: {
    type: {
      success: 'text-green-200 hover:text-green-100',
      error: 'text-red-200 hover:text-red-100',
      warning: 'text-yellow-200 hover:text-yellow-100',
      info: 'text-cyan-200 hover:text-cyan-100'
    }
  }
})