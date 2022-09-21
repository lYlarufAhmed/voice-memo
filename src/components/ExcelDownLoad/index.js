import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logger } from '../../service';

class ExcelDownLoad extends Component {
  static base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  }

  constructor(props) {
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload() {
    const { table, sheet, filename } = this.props;
    if (!document) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        logger.error('Failed to access document object');
      }

      return null;
    }

    if (
      document.getElementById(table).nodeType !== 1 ||
      document.getElementById(table).nodeName !== 'TABLE'
    ) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        logger.error('Provided table property is not html table element');
      }

      return null;
    }

    const tableContent = document.getElementById(table).outerHTML;
    const sheetName = String(sheet);
    const fileName = `${String(filename)}.xls`;

    const uri = 'data:application/vnd.ms-excel;base64,';
    const fileData = [
      `${
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
        'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
        'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
        `lWorksheet><x:Name>${sheetName || 'Worksheet'}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>` +
        '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
        'xml><![endif]--></head><body>'
      }${tableContent}</body></html>`,
    ];

    // If IE11
    if (window.navigator.msSaveOrOpenBlob) {
      const blobObject = new Blob(fileData);
      document.getElementById('react-html-table-to-excel').click()(() => {
        window.navigator.msSaveOrOpenBlob(blobObject, fileName);
      });

      return true;
    }

    const element = window.document.createElement('a');
    element.href = uri + ExcelDownLoad.base64(fileData);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return true;
  }

  render() {
    const { id, className, disabled, buttonText } = this.props;
    return (
      <button
        id={id}
        className={className}
        type="button"
        style={{ maxWidth: 'unset' }}
        onClick={this.handleDownload}
        disabled={disabled}
      >
        {buttonText}
      </button>
    );
  }
}

ExcelDownLoad.defaultProps = {
  id: 'button-download-as-xls',
  className: 'button-download',
  buttonText: 'Download',
  sheet: 'sheet 1',
  disabled: false,
};

ExcelDownLoad.propTypes = {
  table: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  sheet: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ExcelDownLoad;
