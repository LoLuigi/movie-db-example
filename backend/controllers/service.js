
class ServiceController {
  static async index(req, res) {
    console.log('ServiceController.info');
    const uptime = process.uptime();
    const { version } = process;
    res.json({ uptime, version });
  };
};

export default ServiceController;
