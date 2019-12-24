export class Helper {
  public static prepareUri(url, lang, param): string {
    const uri = url + (
      `/${lang || ''}` + param
    ).replace(/\/\//g, '/');

    return uri.endsWith('/') ? uri.slice(0, -1) : uri;
  }
}
