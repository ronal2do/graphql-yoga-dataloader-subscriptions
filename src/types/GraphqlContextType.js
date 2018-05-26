export type GraphqlContextType = {|
  pubsub: Object,
  models: modelsType,
  dataloaders: dataloadersType,
|}

export type modelsType = {|
  Cat: Object,
|}

export type dataloadersType = {|
  CatLoader: Object,
|}
