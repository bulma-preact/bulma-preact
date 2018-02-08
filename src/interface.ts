declare function __include(src, min?)

/**
 * Syntax
 */
type Colors = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger'
type Sizes = 'small' | 'medium' | 'large'

/**
 * Helpers
 */
type Floats = 'clearfix' | 'pulled-left' | 'pulled-right'
type Lesses = 'marginless' | 'paddingless' | 'radiusless' | 'shadowless'
type Alignments = 'left' | 'centered' | 'right';

interface ComponentBaseProps extends JSX.HTMLAttributes{
    isColor?: Colors,
    isSize?: Sizes,
    isFloat?: Floats,
    isLesses?: Lesses,
    align?: Alignments
}

interface Outlined {
    isOutlined?: boolean
}
interface Loading {
    isLoading?: boolean
}
interface Disabled {
    isDisabled?: boolean
}
interface Active {
    isActive?: boolean;
}
interface Hovered {
    isHovered?: boolean;
}
interface Focused {
    isFocused?: boolean;
}

interface ComponentBaseState extends Outlined, Loading, Disabled, Active, Hovered, Focused {
}

interface Loading {
    isLoading?: boolean;
}
