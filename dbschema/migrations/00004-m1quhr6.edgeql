CREATE MIGRATION m1quhr6qhkvnczj6y5rid5gzgr6d6r4o2aereqydlvd347262wsvda
    ONTO m1tq7q26e7bh7ojlmbvlf4xlsehlswsrj6jcfznkjefilaapy2hiwa
{
  ALTER TYPE default::Card {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (((.front ++ ' ') ++ .back));
  };
};
