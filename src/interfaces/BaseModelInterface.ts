import { ModelsInterface } from "./ModelInterfaces";

export interface BaseModelInterface {
  prototype?;
  associate?(models: ModelsInterface): void;
}