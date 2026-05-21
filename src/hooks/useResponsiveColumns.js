import { useEffect, useState } from 'react';

export function useResponsiveColumns(options = {}) {
  const {
    mobile = 1,
    tablet = 2,
    desktop = 4,
    tabletBreakpoint = 640,
    desktopBreakpoint = 1024,
  } = options;

  const [columns, setColumns] = useState(desktop);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < tabletBreakpoint) {
        setColumns(mobile);
      } else if (width < desktopBreakpoint) {
        setColumns(tablet);
      } else {
        setColumns(desktop);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [mobile, tablet, desktop, tabletBreakpoint, desktopBreakpoint]);

  return columns;
}
