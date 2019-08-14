const rest = 15;

const containerStyle = (
    type = 'topLeft',
    width,
    height,
    domWidth,
    domHeight
) => {
    const baseStyle = { position: 'absolute' };
    let placementStype = {}
    switch (type) {
        case 'topLeft':
            placementStype = { top: -height - rest, left: 0 }
            break;
        case 'topCenter':
            placementStype = { top: -height - rest, left: (domWidth - width) / 2 }
            break;
        case 'topRight':
            placementStype = { top: -height - rest, right: 0 }
            break;
        case 'bottomLeft':
            placementStype = { bottom: -height - rest, left: 0 }
            break;
        case 'bottomCenter':
            placementStype = { bottom: -height - rest, left: (domWidth - width) / 2 }
            break;
        case 'bottomRight':
            placementStype = { bottom: -height - rest, right: 0 }
            break;
        case 'rightTop':
            placementStype = { left: domWidth + rest, top: 0 }
            break;
        case 'rightCenter':
            placementStype = { left: domWidth + rest, top: (domHeight - height) / 2 }
            break;
        case 'rightBottom':
            placementStype = { left: domWidth + rest, bottom: 0 }
            break;
        case 'leftTop':
            placementStype = { right: domWidth + rest, top: 0 }
            break;
        case 'leftCenter':
            placementStype = { right: domWidth + rest, top: (domHeight - height) / 2 }
            break;
        case 'leftBottom':
            placementStype = { right: domWidth + rest, bottom: 0 }
            break;
        default:
            break;
    }
    return { ...baseStyle, ...placementStype }
}

const arrowPlacement = (
    type = 'topLeft',
    width,
    height,
    domWidth,
    domHeight
) => {
    const minWidth = Math.min(width, domWidth);
    const minHeight = Math.min(height, domHeight);
    const baseStyle = {
        width: 8,
        height: 8,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 2,
    }
    let placementStyle = {}
    switch (type) {
        case 'topLeft':
            placementStyle = {
                top: height,
                left: minWidth / 2,
                transform: 'rotate(45deg) translateX(-50%)',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }
            break;
        case 'topCenter':
            placementStyle = {
                top: height,
                left: width / 2,
                transform: 'rotate(45deg) translateX(-50%)',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }
            break;
        case 'topRight':
            placementStyle = {
                top: height,
                right: minWidth / 2,
                transform: 'rotate(45deg) translateY(-50%)',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }
            break;
        case 'bottomLeft':
            placementStyle = {
                bottom: height,
                left: minWidth / 2,
                boxShadow: '2px -2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(-45deg) translateX(-50%)',
            }
            break
        case 'bottomCenter':
            placementStyle = {
                bottom: height,
                left: width / 2,
                boxShadow: '2px -2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(-45deg) translateX(50%)',
            }
            break
        case 'bottomRight':
            placementStyle = {
                bottom: height,
                right: minWidth / 2,
                boxShadow: '2px -2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(-45deg) translateY(50%)',
            }
            break;
        case 'leftTop':
            placementStyle = {
                top: minHeight / 2,
                left: width,
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(-45deg) translateY(-50%)',
            }
            break;
        case 'leftCenter':
            placementStyle = {
                top: height / 2,
                left: width,
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(-45deg) translateY(-50%)',
            }
            break;
        case 'leftBottom':
            placementStyle = {
                bottom: minHeight / 2,
                left: width,
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(-45deg) translateX(-50%)',
            }
            break;
        case 'rightTop':
            placementStyle = {
                top: minHeight / 2,
                right: width,
                boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(45deg) translateY(-50%)',
            }
            break;
        case 'rightCenter':
            placementStyle = {
                top: height / 2,
                right: width,
                boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(45deg) translateY(-50%)',
            }
            break;
        case 'rightBottom':
            placementStyle = {
                bottom: minHeight / 2,
                right: width,
                boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(45deg) translateX(50%)',
            }
            break;
        default:
            break;
    }
    return { ...baseStyle, ...placementStyle }
}

export {
    containerStyle,
    arrowPlacement
}