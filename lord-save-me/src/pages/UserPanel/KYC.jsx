import { useState, useEffect } from "react";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import DocRequirements from "./DocRequirements";


export default function KYC() {

  const business_documents = [
    'Photo Identity Proof',
    'Address Proof',
    'Certificate of Incorporation',
    'Income Tax Returns',
    'GST Returns',
    'Bank Statements (max 1 year old)',
    'List of existing loans and debts', 
    'List of Accounts',
    'Cash Flow Statements',
    'Cancelled Cheque',
  ]

  const home_documents = [
    'Photo Identity Proof',
    'Address Proof',
    'Employment Appointment Letter',
    'Salary slip (3 months old)',
    'Bank Statement (6 months old)',
    'Form 16 (2 years)',
    'Property Document (Sale deed, Khata)',
    'IT Returns',
    'Office Address Proof',
    'Office Ownership Proof',
    'Business Existence Proof (COI)',
    'Income Proof',

  ]

  const education_documents = [
    'Photo Identity Proof (Applicant/Co-Applicant)',
    'Address Proof (Applicant/Co-Applicant)',
    'Income Proof (Applicant/Co-Applicant)',
    'Bank Statements',
    'Proof of Admission',
    'Marksheet (S.S.C./H.S.C./Degree/Diploma)',
    'Collateral Property Document'
  ]


  const personal_documents = [
    'Photo Identity Proof',
    'Address Proof',
    'Income Proof',
    'Job Continuity Proof',
    'Bank Statements (max 1 year old)',
    'Form 16 (2 years)',
    'Salary Slip',
    'List of existing loans and debts', 
    'List of Accounts',
  ]

  const [modalShow, setModalShow] = useState(false);

  const [value,setValue]=useState([1]);
   const handleAdd=()=>{
       const x=[...value,[]]
       setValue(x)
   }
   const handleChange=(onChangeValue,i)=>{
    const inputdata=[...value]
    inputdata[i]=onChangeValue.target.value;
    setValue(inputdata)
   }
   const handleDelete=(i)=>{
       const deleteValue=[...value]
       deleteValue.splice(i,1)
       setValue(deleteValue)  
   }
   console.log(value,"data-");


  // state that will hold the Array of objects
  // initialized with empty array
  const [files, setFiles] = useState([]);
  // onChange function that reads files on uploading them
  // files read are encoded as Base64
  function onFileUpload(event) {
    event.preventDefault();
    // Get the file Id
    let id = event.target.id;
    // Create an instance of FileReader API
    let file_reader = new FileReader();
    // Get the actual file itself
    let file = event.target.files[0];
    file_reader.onload = () => {
      // After uploading the file
      // appending the file to our state array
      // set the object keys and values accordingly
      setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
    };
    // reading the actual uploaded file
    file_reader.readAsDataURL(file);
  }
  // handle submit button for form
  function handleSubmit(e) {
    e.preventDefault();
    console.log(files);
  }
  // button state whether it's disabled or enabled
  const [enabled, setEnabled] = useState(false);
  // using useEffect we can detect if user uploaded any file,
  // so enable submit button
  useEffect(() => {
    if (files.length === 0) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [files]);

  return (
    <>
      <PostLoginNavBar />
      <div style={{ display: 'flex' }}>
        <SideBar />
        
        <div className="container-fluid">
          <div className="title ms-4"> KYC Documents </div>
            
            <Form onSubmit={handleSubmit} className="upload--container">

              <Row className="ms-4" style={{width: '90vw'}}>


            {value.map((data,i)=>{
              return(
                <div className="mt-2">

                  <Col 
                    style={{
                      backgroundColor: "#212529",
                      borderRadius: '10px',
                      width: '750px'
                    }}>
                    <Row>

                      <Col className="col-md-4">
                        <Form.Group controlId="formGridState">
                              <Form.Label style={{color: "white"}}>Choose Document</Form.Label>
                              <Form.Select value={data} onChange={e=>handleChange(e,i)} className="form-control" name="salutation" required >
                                  <option defaultValue value=''>Choose...</option>
                                  <option disabled>BUSINESS LOAN</option>
                                  {business_documents.map((option)=><option>{option}</option>)}
                                  <option disabled>HOME LOAN</option>
                                  {home_documents.map((option)=><option>{option}</option>)}
                                  <option disabled>EDUCATION LOAN</option>
                                  {education_documents.map((option)=><option>{option}</option>)}
                                  <option disabled>PERSONAL LOAN</option>
                                  {personal_documents.map((option)=><option>{option}</option>)}
                              </Form.Select>
                              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                              <Form.Control.Feedback type='invalid'>Please provide a document!</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col className="col-md-7">
                          <label 
                          style={{color: "white"}}
                          className="form-label" for="customFile">Looks good / please upload</label>
                          <input
                            onChange={onFileUpload}
                            id={1} 
                            accept=".jpeg, .pdf"
                            type="file"
                            className="form-control"
                            required />
                      </Col>

                    </Row>
                  </Col>
                <Row>
                  <Col className="mt-3 col-md-1">
                        <Button
                          onClick={()=>handleDelete(i)}
                          type="button"
                          variant="outline-danger" 
                          className="me-4 btn btn-sm">Delete</Button>
                  </Col>

                  <Col className="mt-3 col-md-2">
                      <Button 
                        variant="outline-primary" 
                        className="me-4 btn btn-sm"
                        onClick={() => setModalShow(true)}>Requirements
                        </Button>

                      <DocRequirements
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                  </Col>
                </Row>
                </div>
                )
            })}

              </Row>
                
              <div className="p-2" />

              <div style={{margin: "0 360px 0 0"}} className="text-center">
                    <Button
                        onClick={()=>handleAdd()}
                        type="button"
                        variant="outline-dark" 
                        className="me-4 btn btn-sm">Add Document</Button>


                    <Button
                        type="submit"
                        variant="outline-success"
                        className="me-4 btn btn-sm">Submit</Button>
              </div> 
              
            </Form>
        </div>
      </div>
    </>
  );
};


                //             <div className="accordion">
                //       <Col className="col-md-4">
                //           <MDBAccordion>
                //              <MDBAccordionItem collapseId={2} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #2</>}>
                //                 Legal verification of documents.
                //              </MDBAccordionItem>
                //           </MDBAccordion>
                //       </Col>
                // </div>


            {/*<div className="upload--button">
              <label className="form-label" for="customFile">PAN Card </label>
              <input
                onChange={onFileUpload}
                id={1} 
                accept=".jpeg, .pdf"
                type="file"
                className="form-control"
              />
            </div>
            <div className="upload--button">
              <input
                onChange={onFileUpload}
                id={2}
                accept=".jpeg, .pdf"
                type="file"
                className="form-control"
              />
            </div>
            <div className="upload--button">
              <input
                onChange={onFileUpload}
                id={3}
                accept=".jpeg, .pdf"
                type="file"
                className="form-control"
              />
            </div>
            {enabled ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button disabled type="submit">
                Submit
              </Button>
            )}*/}


            // <Row>
            //       <Col style={{
            //         backgroundColor: "#212529",
            //         borderRadius: '20px'
            //       }}>
            //         <label style={{
            //         color: "white"}}
            //         className="form-label" for="customFile">Address Proof</label>
            //         <input
            //           onChange={onFileUpload}
            //           id={2}
            //           accept=".jpeg, .pdf"
            //           type="file"
            //           className="form-control"
            //           required
            //         />
            //       </Col>
            //     </Row>
            //     <div className="p-2" />
            //     <Row>
            //       <Col style={{
            //         backgroundColor: "#212529",
            //         borderRadius: '20px'
            //       }}>
            //         <label style={{
            //         color: "white"}}
            //         className="form-label" for="customFile">Employment Proof</label>
            //         <input
            //           onChange={onFileUpload}
            //           id={3}
            //           accept=".jpeg, .pdf"
            //           type="file"
            //           className="form-control"
            //           required
            //         />
            //       </Col>
            //     </Row>


            // MDB ACCORDION
            //                 <Row>
            //       <MDBAccordion>
              //       <MDBAccordionItem collapseId={2} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #2</>}>
              //       Legal verification of documents.
              //       </MDBAccordionItem>
            //       </MDBAccordion>
            //     </Row>
            //     <div className="p-2" />