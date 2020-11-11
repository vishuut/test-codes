DLFileEntry image = DLFileEntryLocalServiceUtil.getFileEntry(long_id);
String imageUrl = "";
if (image != null) {
    imageUrl =
        PortalUtil.getPortalURL(request) + "/documents/" + image.getGroupId() + "/" +
            image.getFolderId() + "/" + image.getTitle() + "/" + image.getUuid() + "?t=" +
            System.currentTimeMillis();
}

