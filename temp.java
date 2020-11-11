// I have these two methods. One in ReceiptLocalServiceImpl and the other in EprocessFileUtil. When I am calling the second method from
// the first one, and passing service context using "ServiceContextThreadLocal.getServiceContext()", its gives NullPointerException.
// Please refer to line no. 26 and 40 of this file.

// In ReceiptLocalServiceImpl:

public void generatePreviewImagesOfPDF(Receipt receipt,  Folder previewFolder) {
		new Thread(() -> {
			try {
				User user = UserLocalServiceUtil.getUser(receipt.getCreatedBy());
				PrincipalThreadLocal.setName(user.getUserId());
				PermissionChecker permissionChecker = PermissionCheckerFactoryUtil.create(user);
				PermissionThreadLocal.setPermissionChecker(permissionChecker);
			} catch (PortalException e1) {
				LOGGER.error("Unable to set principle." + e1.getMessage());
			}
			
			List<File> pdfPreviewImages = null;
			try {
				pdfPreviewImages = epfUtil.createPreviewImagesOfPdf(Long.valueOf(receipt.getDocumentId()));
			} catch (Exception e) {
				LOGGER.error("Unable to create PDF preview images.");
				LOGGER.error(e.getMessage());
			}
			if(pdfPreviewImages != null) {
                    // here I am calling the next method.
					epfUtil.addPreviewToDMS(previewFolder, pdfPreviewImages, ServiceContextThreadLocal.getServiceContext()); 
			}else {
				LOGGER.error("Unable to create PDF preview image entry to DMS.");
			}
		}).start();
	}


// In EprocessFileUtil:

public void addPreviewToDMS(Folder previewFolder, List<File> previewFiles, ServiceContext serviceContext) {

		try {
			long userId = serviceContext.getUserId(); // I am getting NullPointerException here.

			long scopeGroupId = serviceContext.getScopeGroupId();

			int pageCounter = 0;
			
			for (File previewFile : previewFiles) {
				pageCounter++;
				DLAppServiceUtil.addFileEntry(scopeGroupId, previewFolder.getFolderId(), previewFile.getName(), "image/png", String.valueOf(pageCounter), "", "", previewFile, serviceContext);
			}
		} catch (PortalException e1) {
			LOGGER.error("Error while adding file entry to DMS.");
		}
		
	}
