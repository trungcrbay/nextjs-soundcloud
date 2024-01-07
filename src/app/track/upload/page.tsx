import UploadTabs from "@/components/track/upload.tabs";
import Container from "@mui/material/Container";

const UploadPage = () => {
  return (
    <div>
      <Container>
        <div style={{border:'1px solid #ccc',padding:'30px',marginTop:'50px'}}>
          <UploadTabs />
        </div>
      </Container>
    </div>
  );
};

export default UploadPage;
