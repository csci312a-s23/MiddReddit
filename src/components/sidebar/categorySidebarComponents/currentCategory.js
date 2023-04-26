export default function CurrentCategorySidebar({ currentCategory }) {
  return (
    <>
      <p>{currentCategory.name}</p>
      <p>{currentCategory.description}</p>
    </>
  );
}
