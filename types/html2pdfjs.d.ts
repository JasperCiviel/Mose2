declare module 'html2pdf.js' {
  export interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
      [key: string]: unknown;
    };
    html2canvas?: {
      scale?: number;
      [key: string]: unknown;
    };
    jsPDF?: {
      unit?: string;
      format?: string | number[];
      orientation?: 'portrait' | 'landscape';
      [key: string]: unknown;
    };
    pagebreak?: {
      mode?: string | string[];
      before?: string | string[];
      after?: string | string[];
      avoid?: string | string[];
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }

  export interface Html2PdfBuilder {
    from(source: HTMLElement | string): Html2PdfBuilder;
    set(options: Html2PdfOptions): Html2PdfBuilder;
    save(): Promise<void>;
    outputPdf(): Promise<unknown>;
    outputImg(): Promise<unknown>;
    output(): Promise<unknown>;
    [key: string]: unknown;
  }

  export interface Html2PdfFn {
    (): Html2PdfBuilder;
    (options: Html2PdfOptions): Html2PdfBuilder;
    from(source: HTMLElement | string): Html2PdfBuilder;
  }

  const html2pdf: Html2PdfFn;
  export default html2pdf;
}
