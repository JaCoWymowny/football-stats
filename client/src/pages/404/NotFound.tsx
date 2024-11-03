const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800'>Oops!</h1>
        <p className='text-xl text-gray-600 mt-4'>Przepraszamy, wystąpił nieoczekiwany błąd.</p>
        <p className='text-lg text-gray-500 mt-2'>404 - Strona nie znaleziona</p>
      </div>
    </div>
  );
};

export default NotFound;
