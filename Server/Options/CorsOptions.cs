using System;
using Microsoft.Extensions.Configuration;

namespace GreenTechSee.Options;

public class CorsOptions
{
    public const string Cors = "Cors";

    [ConfigurationKeyName("Origins")]
    public string StringOrigins { get; set; } = "*";

    public string[] Origins
    {
        get => StringOrigins.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        set => StringOrigins = string.Join(';', value);
    }
}
