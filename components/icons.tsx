import { cn } from '@/lib/utils'

type IconProps = {
    strokeWidth?: number | string
} & React.HTMLAttributes<SVGElement>

const Icons = {
    user: (props: IconProps) => (
        <svg
            viewBox='0 0 24 24'
            className={cn('fill-muted text-muted-foreground', props.className)}
            {...props}
            xmlns='http://www.w3.org/2000/svg'
        >
            <g
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <g>
                <circle
                    cx='12'
                    cy='6'
                    r='4'
                    stroke='currentColor'
                    strokeWidth={props.strokeWidth ?? 1}
                />
                <path
                    d='M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634'
                    stroke='currentColor'
                    strokeWidth={props.strokeWidth ?? 1}
                    strokeLinecap='round'
                />
            </g>
        </svg>
    ),
}

export default Icons
