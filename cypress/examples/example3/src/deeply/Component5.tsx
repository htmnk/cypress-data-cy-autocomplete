function Component5() {
  const name = "foo";

  return (
    <div data-cy="three">
      <ul>
        <li data-cy={5}></li>
        <li data-cy="four"></li>
      </ul>
      {name}
    </div>
  );
}
