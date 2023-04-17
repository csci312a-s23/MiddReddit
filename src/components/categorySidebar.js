export default function CategorySidebar({ categoryQuery }) {
  const categoriesRendered = categoryQuery.map((category) => (
    <li
      key={category}
      data-testid="section"
      onClick={() => {
        //selectSection(ca);
      }}
    >
      {category.name}
    </li>
  ));

  return (
    <div>
      <ul>{categoriesRendered}</ul>
    </div>
  );
}
