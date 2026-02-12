function CategoryCard({ category, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={category.image} alt={category.title} />
      <div className="category-card-body">
        <div className="category-title">{category.title}</div>
      </div>
    </div>
  );
}

export default CategoryCard;
