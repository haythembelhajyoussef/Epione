package tn.esprit.epione.utilities;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.ws.rs.core.MultivaluedMap;

public class Util {

	// save to ...\Epione\Files\
	public static void writeFile(byte[] content, String filename) throws IOException {

		String uploadedFilePath = System.getProperty("user.dir");
		uploadedFilePath = "C:\\epione\\ASP.NET\\Epione.Web\\Content\\Files\\";
		String uploadedFilePath2 = "C:\\root\\Content\\Files\\";
//		System.out.println(uploadedFilePath+"****************************");
//		for (int i = 0; i < 2; i++)
//			uploadedFilePath = uploadedFilePath.substring(0, uploadedFilePath.lastIndexOf("\\"));
//
//		uploadedFilePath += "\\Files\\";// ...\Epione\Files\
//
//		if (uploadedFilePath.contains("Hamdi"))
//			uploadedFilePath = "D:\\9raya\\ESPRIT\\2 ING\\PiDev\\Epione\\Files\\";
//		else
//			uploadedFilePath = "C:\\Epione\\Files\\";

		File file = new File(uploadedFilePath + filename);
		File f2 = new File(uploadedFilePath2 + filename);
		
		if (!file.exists()) {
			file.getParentFile().mkdirs();
			file.createNewFile();
		}

		if (f2.getParentFile().exists()) {
			f2.createNewFile();
			FileOutputStream fop1 = new FileOutputStream(f2);

			fop1.write(content);
			fop1.flush();
			fop1.close();
		}
		System.out.println(file.getPath() + "*********************************");

		FileOutputStream fop = new FileOutputStream(file);

		fop.write(content);
		fop.flush();
		fop.close();

	}

	/**
	 * header sample { Content-Type=[image/png], Content-Disposition=[form-data;
	 * name="file"; filename="filename.extension"] }
	 **/
	// get uploaded filename
	public static String getFileName(MultivaluedMap<String, String> header) {

		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");

		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {

				String[] name = filename.split("=");

				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}
}
