export default function CategorySidebar({ categories, goToCategory }) {
  const childSubitem = (children) => {
    const listOfChildren = children.map((child) => {
      return (
        <>
          <li key={child}>
            <p
              key={child.name}
              onClick={() => {
                console.log(child);
                goToCategory(child.id);
              }}
            >
              {child.name}
            </p>
            {child.parent && childSubitem(child.child)}
          </li>
          {/* child.parent && childSubitem(child.parent) || doesn't work recursively, probably have to update the api call to recurse  */}
          {/* also update function call to only pull into main list items that don't have a parent element, update parent and child calls appropiately*/}
        </>
      );
    });
    return <ul>{listOfChildren}</ul>;
  };

  const categoriesRendered = categories.map((category) => (
    <li key={category}>
      <p
        key={category}
        data-testid="section"
        onClick={() => {
          //setCurrentPost(post.id);
          console.log(category);
          goToCategory(category.id);
        }}
      >
        {category.name}
      </p>

      {childSubitem(category.child)}
    </li>
  ));

  return (
    <div>
      <ul>{categoriesRendered}</ul>
    </div>
  );
}
