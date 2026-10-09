const found = useMemo(() => Array.from(new Set(paste.match(/\d{3,}/g) || [])), [paste]);
