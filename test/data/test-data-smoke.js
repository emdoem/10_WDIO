export const TEST_DATA = {
    COMPUTE_ENGINE: {
        numberOfInstances: {
            title: "Number of Instances",
            value: "2"
        },
        operatingSystem: {
            title: "Operating System / Software",
            value: "Paid: Windows Server",
            data_value: 'paid-windows-server'
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
            value: "f1-micro" 
        },
        addGPUs: {
            title: "Add GPUs",
            value: false
        },
        gpuType: {
            title: "GPU Model",
            value: ""
        },
        numberOfGPUs: {
            title: "Number of GPUs",
            value: ""
        },
        localSSD: {
            title: "Local SSD",
            value: "1x375 GB",
            data_value: "1"
        },
        region: {
            title: "Region",
            value: "europe-central2"
        },
        commitedUsage: {
            title: "Committed use discount options",
            value: "3 Years"
        }
    }
}