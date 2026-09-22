using System;

namespace GreenTechSee.Data;

[AttributeUsage(AttributeTargets.Property)]
public class ComputedAttribute(string sql) : Attribute
{
    public string Sql { get; set; } = sql;
}
