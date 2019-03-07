/**
 * Syntax
 */
export type Colors = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger'
export type Sizes = 'small' | 'medium' | 'large'

/**
 * Helpers
 */
export type Floats = 'clearfix' | 'pulled-left' | 'pulled-right'
export type Lesses = 'marginless' | 'paddingless' | 'radiusless' | 'shadowless'
export type Alignments = 'left' | 'centered' | 'right';

export type ColumnSizes = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export interface ComponentBaseProps extends JSX.HTMLAttributes{
    isColor?: Colors,
    isSize?: Sizes,
    isFloat?: Floats,
    isLesses?: Lesses,
    isBoxed?: boolean,
    isRounded?: boolean,
    align?: Alignments
}

export interface Outlined {
    isOutlined?: boolean
}
export interface Loading {
    isLoading?: boolean
}
export interface Disabled {
    isDisabled?: boolean
}
export interface Active {
    isActive?: boolean;
}
export interface Hovered {
    isHovered?: boolean;
}
export interface Focused {
    isFocused?: boolean;
}

export interface ComponentBaseState extends Outlined, Loading, Disabled, Active, Hovered, Focused {
}

export interface Loading {
    isLoading?: boolean;
}

export interface Event {
    
}