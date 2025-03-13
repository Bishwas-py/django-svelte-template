import { tv } from 'tailwind-variants';

export const flashVariants = tv({
	base: `not-last:-mb-5 z-10
	hover:z-20
	w-[80vw] sm:w-96 py-3 px-2
	rounded flex flex-col gap-2 select-none
	ring hover:ring-2
	transition-all duration-300 ease-in-out transform
	scale-90 last:scale-100 hover:scale-100
	cursor-pointer`,
	variants: {
		type: {
			success: 'ring-green-500 bg-green-800',
			error: 'ring-red-800 bg-red-950',
			warning: 'ring-orange-500 bg-orange-700',
			info: 'ring-cyan-800 bg-cyan-950'
		}
	}
});

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
});

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
});

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
});
