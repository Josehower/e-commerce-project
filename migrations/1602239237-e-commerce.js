exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS product(
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, name varchar(50), category varchar(50), price integer, img varchar(500));`;

  await sql`
	CREATE TABLE size_options (
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
		size_option_name varchar(15));`;

  await sql`
	CREATE TABLE product_sizes (
		product_id INT,
		size_id INT,
		PRIMARY KEY (product_id, size_id),
		FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
		FOREIGN KEY (size_id) REFERENCES size_options (id)
	);
`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE IF EXISTS product, size_options,product_sizes`;
};
