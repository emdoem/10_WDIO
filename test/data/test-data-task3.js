export const TEST_DATA = {
    SEARCH_INPUT: "Google Cloud Platform Pricing Calculator",
    SEARCH_RESULT: "Google Cloud Pricing Calculator",
    COMPUTE_ENGINE: {
        numberOfInstances: {
            title: "Number of Instances",
            value: "4"
        },
        operatingSystem: {
            title: "Operating System / Software",
            value: "Free: Debian, CentOS, CoreOS, Ubuntu",
            data_value: 'free-debian-centos'
        },
        provisioningModel: {
            title: "Provisioning Model",
            value: "Regular"
        },
        series: {
            title: "Series",
            value: "N1",
            // this needs to go. implement .toLowerCase() instead
            data_value: "n1"
        },
        machineType: { 
            title: "Machine type",
            value: "n1-standard-8" 
        },
        addGPUs: {
            title: "Add GPUs",
            value: true
        },
        gpuType: {
            title: "GPU Model",
            value: "NVIDIA Tesla V100",
            data_value: 'nvidia-tesla-v100'
        },
        numberOfGPUs: {
            title: "Number of GPUs",
            value: "1"
        },
        localSSD: {
            title: "Local SSD",
            value: "2x375 GB",
            data_value: "2"
        },
        region: {
            title: "Region",
            value: "europe-west4"
        },
        commitedUsage: {
            title: "Committed use discount options",
            value: "1 Year"
        }
    }
}