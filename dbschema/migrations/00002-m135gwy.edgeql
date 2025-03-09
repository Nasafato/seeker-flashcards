CREATE MIGRATION m135gwynnuamw5o76c3qgox3i4ykmihxkt4zf2yd34ojgcnjg6hxpa
    ONTO m1fdtcahp3bnur3a7ujccvw3rclyjyr4q4jyp4w2hllrkrujgfhvma
{
  CREATE ABSTRACT TYPE default::Timestamped {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Card EXTENDING default::Timestamped LAST;
  ALTER TYPE default::Deck EXTENDING default::Timestamped LAST;
};
