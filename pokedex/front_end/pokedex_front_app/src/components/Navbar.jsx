export default function Navbar({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="box-nav">
      <div
        className="arrow"
        style={{ cursor: currentPage > 0 ? 'pointer' : 'default', opacity: currentPage > 0 ? 1 : 0.3 }}
        onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
      >
        {'◀'}
      </div>
      <div className="box-title">Box {currentPage + 1} / {totalPages}</div>
      <div
        className="arrow"
        style={{ cursor: currentPage < totalPages - 1 ? 'pointer' : 'default', opacity: currentPage < totalPages - 1 ? 1 : 0.3 }}
        onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
      >
        {'▶'}
      </div>
    </div>
  );
}
