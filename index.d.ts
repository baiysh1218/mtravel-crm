declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare module "*.scss" {
  const content: { [key: string]: any };
  export = content;
}
