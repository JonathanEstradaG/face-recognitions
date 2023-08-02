
import { RekognitionClient, StartLabelDetectionCommand, GetLabelDetectionCommand } from "@aws-sdk/client-rekognition";
import { stdout } from "process";

// Set the AWS Region.
const REGION = "region-name"; //e.g. "us-east-1"
// Create SNS service object.
const rekClient = new RekognitionClient({ region: REGION });

// Set bucket and video variables
const bucket = "bucket-name";
const videoName = "video-name";
const roleArn = "role-arn"
var startJobId = ""

var ts = Date.now();
const snsTopicName = "AmazonRekognitionExample" + ts;
const snsTopicParams = { Name: snsTopicName }
const sqsQueueName = "AmazonRekognitionQueue-" + ts;

// Set the parameters
const sqsParams = {
  QueueName: sqsQueueName, //SQS_QUEUE_URL
  Attributes: {
    DelaySeconds: "60", // Number of seconds delay.
    MessageRetentionPeriod: "86400", // Number of seconds delay.
  },
};

const startLabelDetection = async (roleArn: any, snsTopicArn: any) => {
  try {
    //Initiate label detection and update value of startJobId with returned Job ID
    const labelDetectionResponse = await rekClient.send(new StartLabelDetectionCommand({
      Video: { S3Object: { Bucket: bucket, Name: videoName } },
      NotificationChannel: { RoleArn: roleArn, SNSTopicArn: snsTopicArn }
    }));
    startJobId = labelDetectionResponse.JobId!
    console.log(`JobID: ${startJobId}`)
    return startJobId
  } catch (err) {
    console.log("Error", err);
  }
};

const getLabelDetectionResults = async (startJobId: any) => {
  console.log("Retrieving Label Detection results")
  // Set max results, paginationToken and finished will be updated depending on response values
  var maxResults = 10
  var paginationToken = ''
  var finished = false

  // Begin retrieving label detection results
  while (finished == false) {
    var response = await rekClient.send(new GetLabelDetectionCommand({
      JobId: startJobId, MaxResults: maxResults,
      NextToken: paginationToken, SortBy: 'TIMESTAMP'
    }))
    // Log metadata
    console.log(`Codec: ${response.VideoMetadata!.Codec}`)
    console.log(`Duration: ${response.VideoMetadata!.DurationMillis}`)
    console.log(`Format: ${response.VideoMetadata!.Format}`)
    console.log(`Frame Rate: ${response.VideoMetadata!.FrameRate}`)
    console.log()
    // For every detected label, log label, confidence, bounding box, and timestamp
    response.Labels!.forEach(labelDetection => {
      var label = labelDetection.Label
      console.log(`Timestamp: ${labelDetection.Timestamp}`)
      console.log(`Label: ${label!.Name}`)
      console.log(`Confidence: ${label!.Confidence}`)
      console.log("Instances:")
      label!.Instances!.forEach(instance => {
        console.log(`Confidence: ${instance.Confidence}`)
        console.log("Bounding Box:")
        console.log(`Top: ${instance.Confidence}`)
        console.log(`Left: ${instance.Confidence}`)
        console.log(`Width: ${instance.Confidence}`)
        console.log(`Height: ${instance.Confidence}`)
        console.log()
      })
      console.log()
      // Log parent if found
      console.log("   Parents:")
      label!.Parents!.forEach(parent => {
        console.log(`    ${parent.Name}`)
      })
      console.log()
      // Searh for pagination token, if found, set variable to next token
      if (String(response).includes("NextToken")) {
        paginationToken = response.NextToken!

      } else {
        finished = true
      }

    })
  }
}

// Checks for status of job completion
const getSQSMessageSuccess = async (sqsQueueUrl: any, startJobId: any) => {
  try {
    // Set job found and success status to false initially
    var succeeded = false
    // while not found, continue to poll for response
    return succeeded
  } catch (err) {
    console.log("Error", err);
  }
};

// Start label detection job, sent status notification, check for success status
// Retrieve results if status is "SUCEEDED", delete notification queue and topic
const runLabelDetectionAndGetResults = async () => {
  try {
    console.log(getSQSMessageSuccess)
   
    console.log("Successfully deleted.")
  } catch (err) {
    console.log("Error", err);
  }
};

runLabelDetectionAndGetResults()