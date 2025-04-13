export const addPage = (setPages, name, url) => {
    const newPage = { 
      id: Date.now(),
      name,
      url,
    };
    setPages(prevPages => [...prevPages, newPage]);
  };
  