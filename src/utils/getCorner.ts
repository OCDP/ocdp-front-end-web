export default function (
  corner:
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left',
  distance = 2
): React.CSSProperties {
  const d = `${distance}em`;
  switch (corner) {
    case 'right':
      return {
        position: 'absolute', 
        top: '50%',
        right: d,
        transform: 'translateY(-50%)'
      };
    case 'bottom-right':
      return {
        position: 'absolute',
        bottom: d,
        right: d
      };
    case 'bottom':
      return {
        position: 'absolute',
        bottom: d,
        left: '50%',
        transform: 'translateX(-50%)'
      };
    case 'bottom-left':
      return {
        position: 'absolute',
        bottom: d,
        left: d
      };
    case 'left':
      return {
        position: 'absolute',
        top: '50%',
        left: d,
        transform: 'translateY(-50%)'
      };
    case 'top-left':
      return {
        position: 'absolute',
        top: d,
        left: d
      };
    case 'top':
      return {
        position: 'absolute',
        top: d,
        left: '50%',
        transform: 'translateX(-50%)'
      };
    case 'top-right':
      return {
        position: 'absolute',
        top: d,
        right: d
      };
  }
}
