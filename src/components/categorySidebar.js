export default function CategorySidebar({ categoryQuery }) {
  const childSubitem = (children) => {
    const listOfChildren = children.map((child) => {
      console.log(child.name);
      return (
        <>
          <li>{child.name}</li>
          {/* child.parent && childSubitem(child.parent) || doesn't work recursively, probably have to update the api call to recurse  */}
          {/* also update function call to only pull into main list items that don't have a parent element, update parent and child calls appropiately*/}
        </>
      );
    });
    console.log(listOfChildren);
    return <ul>{listOfChildren}</ul>;
  };

  const categoriesRendered = categoryQuery.map((category) => (
    <li
      key={category}
      data-testid="section"
      onClick={() => {
        //selectSection(ca);
      }}
    >
      {category.name}
      {childSubitem(category.parent)}
    </li>
  ));

  return (
    <div>
      <ul>{categoriesRendered}</ul>
    </div>
  );
}
