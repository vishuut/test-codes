package com.adjecti.eprocess.pdfmergerutility;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.osgi.service.component.annotations.Component;
/**
 * @author vishal
 */
@Component()
public class PdfMergerUtility {

	private static final Logger LOGGER = Logger.getLogger(PdfMergerUtility.class.getName());

	private static final String MERGED_DOCUMENT_NAME = "../temp/mergedDocument.pdf";
	
	public static String merge(String[] pdfFilesPath) {

		List<File> pdfFiles = new ArrayList<>();
		PDDocument mergedDocument = new PDDocument();
		PDDocument pdfDocument = null;
		String mergedFileAbsolutePath = "";
		
		try {
			for (String pdfFilePath : pdfFilesPath) {
				pdfFiles.add(new File(pdfFilePath));
			}

			if (!pdfFiles.isEmpty()) {

				for (File pdfFileItem : pdfFiles) {

					pdfDocument = PDDocument.load(pdfFileItem);

					int numberOfPages = pdfDocument.getNumberOfPages();

					for (int pageCounter = 0; pageCounter <= numberOfPages; pageCounter++) {
						PDPage page = pdfDocument.getPage(pageCounter);

						PDPageContentStream contentStream = new PDPageContentStream(pdfDocument, page);

						String lineToBeAdded = pdfDocument.getDocumentInformation().getTitle() + " - " + pageCounter
								+ "/" + numberOfPages;

						contentStream.beginText();

						contentStream.newLineAtOffset(30, 50);

						contentStream.showText(lineToBeAdded);

						contentStream.endText();

						contentStream.close();

						mergedDocument.addPage(page);

					}

					pdfDocument.close();
				}
			}
			
			String mergedFileName = MERGED_DOCUMENT_NAME + (new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date()));
			File tempFile = new File(mergedFileName);
			
			mergedDocument.save(tempFile);

			mergedDocument.close();
			
			mergedFileAbsolutePath = tempFile.getAbsolutePath();
			
			System.out.println("----Merged File= " + mergedFileAbsolutePath);
			
		} catch (InvalidPasswordException e) {
			LOGGER.info("PDF Merger unable to open protected file." + e.getMessage());
		} catch (IOException e) {
			LOGGER.info(e.getMessage());
		} finally {
			try {
				mergedDocument.close();
				if(pdfDocument != null)
					pdfDocument.close();
			} catch (IOException e) {
				LOGGER.info(e.getMessage());
			}
		}

		return MERGED_DOCUMENT_NAME;
	}
}

