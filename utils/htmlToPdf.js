import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
	install(Vue, options) {
		Vue.prototype.getPdf = function(id, title) {
			html2Canvas(document.querySelector(`#${id}`), {
				// allowTaint: true //跨域图片
				useCORS: true //跨域图片，
			}).then(function(canvas) {
				let contentWidth = canvas.width
				let contentHeight = canvas.height
				let pageHeight = contentWidth / 555.28 * 841.89
				let leftHeight = contentHeight
				let position = 20
				let imgWidth = 555.28
				let imgHeight = 555.28 / contentWidth * contentHeight
				let pageData = canvas.toDataURL('image/jpeg', 1.0)
				let PDF = new JsPDF('', 'pt', 'a4')
				if (leftHeight < pageHeight) {
					PDF.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight)
				} else {
					while (leftHeight > 0) {
						PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
						leftHeight -= pageHeight
						position -= 841.89
						if (leftHeight > 0) {
							PDF.addPage()
						}
					}
				}
				PDF.save(title + '.pdf')
			})
		}
	}
}
