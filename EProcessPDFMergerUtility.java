package com.adjecti.eprocess.whitewall.portlet;

import com.liferay.portal.kernel.util.FileUtil;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

public class EProcessPDFMergerUtility {
	private static final Logger LOGGER = Logger.getLogger(EProcessPDFMergerUtility.class.getName());


	public static File merge(List<String> pdfFilesPath) {
		
		List<File> pdfFiles = null;
		PDDocument mergedDocument = null;
		PDDocument pdfDocument = null;

		if (pdfFilesPath != null && !pdfFilesPath.isEmpty()) {

			pdfFiles = new ArrayList<>();
			mergedDocument = new PDDocument();

			try {
				
				for (String pdfFilePath : pdfFilesPath) {
					pdfFiles.add(new File(pdfFilePath));
				}

				if (!pdfFiles.isEmpty()) {

					for (File pdfFileItem : pdfFiles) {
						
						pdfDocument = PDDocument.load(pdfFileItem);

						int numberOfPages = pdfDocument.getNumberOfPages();

						for (int pageCounter = 0; pageCounter < numberOfPages; pageCounter++) {
							PDPage page = pdfDocument.getPage(pageCounter);

							// Adding a text line to the page [Start]
							PDPageContentStream contentStream = new PDPageContentStream(pdfDocument, page,
									PDPageContentStream.AppendMode.APPEND, true);

							String lineToBeAdded = pdfFileItem.getName() + " - " + (pageCounter + 1) + "/"
									+ numberOfPages;

							contentStream.beginText();

							contentStream.newLineAtOffset(30, 760);

							contentStream.setFont(PDType1Font.COURIER, 12);

							contentStream.showText(lineToBeAdded);

							contentStream.endText();

							contentStream.close();
							// Adding a text line to the page [End]

							mergedDocument.addPage(page);

						}

					}
				}

				File tempFile = FileUtil.createTempFile("pdf");
				
				mergedDocument.save(tempFile);
				mergedDocument.close();
				pdfDocument.close();

				return tempFile;

			} catch (InvalidPasswordException ex) {
				LOGGER.info("PDF Merger unable to open protected file." + ex.getMessage());
				try {
					if(mergedDocument != null){
						mergedDocument.close();
					}
					if (pdfDocument != null)
						pdfDocument.close();
				} catch (IOException e) {
					LOGGER.info(e.getMessage());
				}
			} catch (IOException ex) {
				LOGGER.info(ex.getMessage());
			}finally{
				if(mergedDocument != null){
					mergedDocument.close();
				}
				if(pdfDocument != null){
					pdfDocument.close();
				}
			}
		}

		return null;
	}
}
